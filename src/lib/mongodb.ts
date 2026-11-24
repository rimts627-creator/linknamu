import { MongoClient, type Collection } from "mongodb";

type ClickDoc = { _id: string; count: number };

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 핫 리로드에서도 연결을 재사용하기 위한 전역 캐시
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결을 캐시에 남기면 다시 시도하지 않으므로 비워 둠
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

async function getClicksCollection(): Promise<Collection<ClickDoc> | null> {
  const clientPromise = getClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}

/** 링크별 클릭 수. DB가 설정되지 않았거나 연결에 실패하면 null */
export async function getClickCounts(): Promise<Record<string, number> | null> {
  try {
    const col = await getClicksCollection();
    if (!col) return null;
    const docs = await col.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (err) {
    console.error("[mongodb] 클릭 수 조회 실패:", err);
    return null;
  }
}

/** 클릭 수 1 증가. 저장했으면 true */
export async function incrementClick(linkId: string): Promise<boolean> {
  const col = await getClicksCollection();
  if (!col) return false;
  await col.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
  return true;
}
