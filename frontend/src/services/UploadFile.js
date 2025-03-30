import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://kuegqsaicqwymbbntqpv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZWdxc2FpY3F3eW1iYm50cXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMTgwNTcsImV4cCI6MjA1NzU5NDA1N30.Jz2N948JN9KBnzy8PNnrJNuzTJXc343v9zPJdbACgds";
const bucketName = "proathlete-product";

const supabase = createClient(supabaseURL, supabaseKey);

export const handleUploadFile = async (files) => {
  const uploadedUrls = [];

  for (let file of files) {
    const filePath = `uploads/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error);
    } else {
      const { data: url } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      uploadedUrls.push(url.publicUrl);
      console.log("Uploaded:", url.publicUrl);
    }
  }

  return uploadedUrls;
};
