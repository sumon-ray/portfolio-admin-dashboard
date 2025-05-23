"use client";

import { uploadResume } from "@/services/resumeService";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { uploadResume, ApiResponse } from './path-to-uploadResume'; // adjust import

type FormValues = {
  resume: FileList;
};

const Resumepage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [uploadStatus, setUploadStatus] = useState<string>("");

  const onSubmit = async (data: FormValues) => {
    const file = data.resume[0];
    if (!file) {
      setUploadStatus("❌ No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      setUploadStatus("❌ Please upload a valid PDF file.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const response = await uploadResume(file);
console.log(response, "form")
      if (response && response.success) {
        setUploadStatus(`✅ ${file.name} uploaded successfully!`);
        reset();
      } else {
        setUploadStatus(
          `❌ Upload failed: ${response?.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setUploadStatus(
        "❌ Upload failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Resume (PDF)
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            accept="application/pdf"
            {...register("resume", { required: "Resume PDF is required" })}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          {errors.resume && (
            <p className="text-red-600 mt-2 text-sm">{errors.resume.message}</p>
          )}

          {uploadStatus && (
            <p
              className={`mt-4 text-sm ${
                uploadStatus.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {uploadStatus}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Upload Resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resumepage;
