import SkeletonCard from "@/components/SkeletonCard";
import React from "react";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1, 2, 3, 4, 5, 6];
  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 md:px-0">
      <h1 className="font-bold text-3xl">MY LEARNING</h1>
      <div className="my-10">
        {isLoading ? (
          <SkeletonCard />
        ) : myLearningCourses.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myLearningCourses.map((el, i) => (
              <Course key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
