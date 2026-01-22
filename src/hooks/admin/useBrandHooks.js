"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { submitBrand } from "@/services/admin/brandServices";

export const useBrandHooks = () => {
    const {
        handleSubmit,
        register,
        reset,
        control,
        watch,
        formState: { errors },
    } = useForm();

    const [previewSrc, setPreviewSrc] = useState(null);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => submitBrand(formData, { token }),
        onSuccess: (result) => {
            if (result?.status === true) {
                swal("Success", result.message || "Brand created successfully", "success");
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

    // ✅ Watch brand logo for preview
    const watchedLogo = watch("brand_logo");

    useEffect(() => {
        if (watchedLogo && watchedLogo.length > 0) {
            const file = watchedLogo[0];
            const reader = new FileReader();
            reader.onload = (e) => setPreviewSrc(e.target.result);
            reader.readAsDataURL(file);

            return () => {
                reader.onload = null;
            };
        } else {
            setPreviewSrc(null);
        }
    }, [watchedLogo]);

    // ✅ Form submit handler
    const onSubmit = (values) => {
        const formData = new FormData();

        const fields = [
            "title",
            "subtitle",
            "small_description",
            "long_description",
            "key_features",
        ];

        fields.forEach((f) => {
            if (values[f] !== undefined && values[f] !== null && values[f] !== "") {
                formData.append(f, values[f]);
            }
        });

        if (values.brand_logo && values.brand_logo.length > 0) {
            formData.append("brand_logo", values.brand_logo[0]);
        }

        mutate(formData);
    };

    return {
        onSubmit: handleSubmit(onSubmit),
        register,
        reset,
        control,
        isLoading,
        errors,
        previewSrc,
    };
};
