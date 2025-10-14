import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const emailContent = `
새로운 상담 신청이 접수되었습니다.

성함: ${name}
연락처: ${phone}
문의 서비스: ${service}
문의 내용: ${message || "없음"}

접수 시간: ${new Date().toLocaleString("ko-KR")}
    `.trim();

    console.log("상담 신청 접수:", emailContent);

    // 환경변수 검증
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.CONTACT_EMAIL) {
      console.error("Missing required email configuration");
      return NextResponse.json(
        { error: "이메일 설정이 누락되었습니다. 관리자에게 문의하세요." },
        { status: 500 }
      );
    }

    // 네이버 메일 SMTP를 사용한 이메일 발송
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.naver.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // TLS 사용
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `[라라재가방문요양] 새로운 상담 신청 - ${name}님`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22BBB4;">새로운 상담 신청</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>성함:</strong> ${name}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <p><strong>문의 서비스:</strong> ${service}</p>
            <p><strong>문의 내용:</strong> ${message || "없음"}</p>
            <p><strong>접수 시간:</strong> ${new Date().toLocaleString("ko-KR")}</p>
          </div>
        </div>
      `,
    });

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
