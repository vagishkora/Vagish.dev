import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();

    // Main portfolio public directories
    const mainPublicDir = path.resolve(process.cwd(), "../public");
    const resumesDir = path.join(mainPublicDir, "resumes");

    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }

    // Save as standard Vagish_Resume.pdf
    fs.writeFileSync(path.join(mainPublicDir, "Vagish_Resume.pdf"), buffer);

    // Save as unique timestamped file to bypass browser caching
    const timestampedFileName = `Vagish_Resume_${timestamp}.pdf`;
    fs.writeFileSync(path.join(resumesDir, timestampedFileName), buffer);

    // Also save in local admin public directory if it exists
    const localPublicDir = path.resolve(process.cwd(), "public");
    if (fs.existsSync(localPublicDir)) {
      const localResumesDir = path.join(localPublicDir, "resumes");
      if (!fs.existsSync(localResumesDir)) {
        fs.mkdirSync(localResumesDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localPublicDir, "Vagish_Resume.pdf"), buffer);
      fs.writeFileSync(path.join(localResumesDir, timestampedFileName), buffer);
    }

    const fileUrl = `/Vagish.dev/resumes/${timestampedFileName}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (err: any) {
    console.error("Upload API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
