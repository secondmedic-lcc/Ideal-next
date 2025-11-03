"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { submitCourse } from "@/services/admin/courseService";

export const useCourseForm = () => {
    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const [previewSrc, setPreviewSrc] = useState(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => submitCourse(formData, { token }),
        onSuccess: (result) => {
            if (result?.status === true) {
                swal("Success", result.message || "Course created", "success");
                reset();
                setPreviewSrc(null);
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: (err) => {
            const msg = err?.message || "Network or server error";
            swal("Error", msg, "error");
        },
    });

    // watch file input for preview
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedFile = watch("course_about_image");

    useEffect(() => {
        if (watchedFile && watchedFile.length > 0) {
            const file = watchedFile[0];
            const reader = new FileReader();
            reader.onload = (e) => setPreviewSrc(e.target.result);
            reader.readAsDataURL(file);

            return () => {
                reader.onload = null;
            };
        } else {
            setPreviewSrc(null);
        }
    }, [watchedFile]);

    const onSubmit = (values) => {
        const formData = new FormData();

        const fields = [
            "course_name",
            "course_slug",
            "course_title",
            "course_description",
            "course_about_title",
            "course_about_desc",
        ];

        fields.forEach((f) => {
            if (values[f] !== undefined && values[f] !== null && values[f] !== "") {
                formData.append(f, values[f]);
            }
        });

        if (values.course_about_image && values.course_about_image.length > 0) {
            formData.append("course_about_image", values.course_about_image[0]);
        }

        mutate(formData);
    };

    return {
        onSubmit: handleSubmit(onSubmit),
        register,
        reset,
        isLoading,
        errors,
        previewSrc,
    };
};
