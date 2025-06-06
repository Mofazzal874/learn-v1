"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateCourse } from "@/app/actions/course";
import { toast } from "sonner";

interface EditCourseFormProps {
  course: any;
  courseId: string;
  categories: string[];
}

export default function EditCourseForm({ course, courseId, categories }: EditCourseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await updateCourse(courseId, formData);
      toast.success("Course updated successfully");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit}>
      <Card className="bg-[#141414] border-gray-800 p-6">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Course Information
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Course Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={course.title}
                  required
                  className="bg-[#1a1a1a] border-gray-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category
                </Label>
                <Select name="category" defaultValue={course.category}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-800 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">
                  Price (USD)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={course.price}
                  required
                  className="bg-[#1a1a1a] border-gray-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="text-white">
                  Level
                </Label>
                <Select name="level" defaultValue={course.level}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-800 text-white">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Course Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={course.description}
                  required
                  className="min-h-[150px] bg-[#1a1a1a] border-gray-800 text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Additional Details
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prerequisites" className="text-white">
                  Prerequisites
                </Label>
                <Textarea
                  id="prerequisites"
                  name="prerequisites"
                  defaultValue={course.prerequisites?.join("\n")}
                  className="min-h-[100px] bg-[#1a1a1a] border-gray-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcomes" className="text-white">
                  Learning Outcomes
                </Label>
                <Textarea
                  id="outcomes"
                  name="outcomes"
                  defaultValue={course.outcomes?.join("\n")}
                  className="min-h-[100px] bg-[#1a1a1a] border-gray-800 text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}