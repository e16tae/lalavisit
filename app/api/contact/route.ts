import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    // 입력 검증
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 발송 로직
    // 실제 환경에서는 nodemailer, sendgrid, resend 등의 이메일 서비스를 사용합니다
    // 여기서는 기본 구조만 제공합니다

    const emailContent = `
새로운 상담 신청이 접수되었습니다.

성함: ${name}
연락처: ${phone}
문의 서비스: ${service}
문의 내용: ${message || "없음"}

접수 시간: ${new Date().toLocaleString("ko-KR")}
    `.trim();

    console.log("상담 신청 접수:", emailContent);

    // TODO: 실제 이메일 발송 구현
    // 예시 (nodemailer 사용 시):
    /*
    import nodemailer from "nodemailer";

    const transporter = nodemailer.createTransport({
      service: "gmail", // 또는 다른 이메일 서비스
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "lalavisit@naver.com", // 센터 이메일
      subject: `[라라방문] 새로운 상담 신청 - ${name}님`,
      text: emailContent,
      html: `
        <h2>새로운 상담 신청</h2>
        <p><strong>성함:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>문의 서비스:</strong> ${service}</p>
        <p><strong>문의 내용:</strong> ${message || "없음"}</p>
        <p><strong>접수 시간:</strong> ${new Date().toLocaleString("ko-KR")}</p>
      `,
    });
    */

    // TODO: 카카오톡 알림톡 발송 (선택사항)
    // 카카오톡 비즈니스 API를 사용하여 신청자의 연락처로 접수 확인 메시지 발송

    return NextResponse.json(
      {
        success: true,
        message: "상담 신청이 접수되었습니다."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
