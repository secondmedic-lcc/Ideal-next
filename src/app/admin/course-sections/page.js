"use client";

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'

export default function CourseSectionsLis() {
    return (
        <>
            <Suspense fallback={<div className="container mt-4">Loading Editor...</div>}>
                <SectionsList />
            </Suspense>
        </>
    )
}


const SectionsList = () => {
    const searchParams = useSearchParams();
    const rawCourseId = searchParams?.get("course_id");
    const courseId = rawCourseId ? Number(rawCourseId) : null;

    return (
        <>

        </>
    )
}