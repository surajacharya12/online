"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export function AddNewCourseDialog({ children }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false,
    chapters: "",
    level: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = (event) => {
    event?.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.chapters ||
      !formData.level ||
      !formData.category
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const chaptersNumber = Number(formData.chapters);
    if (isNaN(chaptersNumber) || chaptersNumber <= 0) {
      alert("Please enter a valid number of chapters.");
      return;
    }

    onGenerate();
  };

  const onGenerate = async () => {
  try {
    const courseId = uuidv4();
    setLoading(true);
    const result = await axios.post("/api/generate-course-layout", {
      ...formData,
      chapters: Number(formData.chapters),  // convert here
      courseId,
    });
    router.push("/allinsight/edit-course-layout/" + result.data?.courseId);
    alert("Course layout generated successfully!");
    setFormData({
      name: "",
      description: "",
      includeVideo: false,
      chapters: "",
      level: "",
      category: "",
    });
  } catch (error) {
    console.error("Error generating course layout:", error);
    alert("Failed to generate course layout. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl rounded-2xl shadow-xl border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Create New Course Using AI
          </DialogTitle>
          <DialogDescription asChild>
            <form className="space-y-6 mt-6" onSubmit={onSubmit}>
              {/* Course Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <Input
                  placeholder="e.g. Introduction to React"
                  value={formData.name}
                  onChange={(e) => onHandleInputChange("name", e.target.value)}
                  className="rounded-lg px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition"
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  placeholder="Brief overview of the course"
                  value={formData.description}
                  onChange={(e) =>
                    onHandleInputChange("description", e.target.value)
                  }
                  className="rounded-lg px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition min-h-[100px]"
                  disabled={loading}
                />
              </div>

              {/* Include Video */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="includeVideo"
                  checked={formData.includeVideo}
                  onChange={(e) =>
                    onHandleInputChange("includeVideo", e.target.checked)
                  }
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  disabled={loading}
                />
                <span className="text-sm font-medium text-gray-700">
                  Include video content
                </span>
              </div>

              {/* Chapters */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Number of Chapters
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.chapters}
                  onChange={(e) =>
                    onHandleInputChange("chapters", e.target.value)
                  }
                  className="rounded-lg px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition"
                  disabled={loading}
                />
              </div>

              {/* Level */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={(e) => onHandleInputChange("level", e.target.value)}
                  className="rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Input
                  placeholder="e.g. Web Development"
                  value={formData.category}
                  onChange={(e) =>
                    onHandleInputChange("category", e.target.value)
                  }
                  className="rounded-lg px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <span>{loading ? "Submitting..." : "Submit"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
