import { NextResponse } from "next/server";
import { linkIds } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const counts = await getClickCounts();
  if (counts === null) {
    return NextResponse.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
  }
  return NextResponse.json(counts);
}

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해 임의의 키가 DB에 쌓이지 않도록 함
  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const saved = await incrementClick(id);
    if (!saved) {
      return NextResponse.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/clicks] 저장 실패:", err);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}
