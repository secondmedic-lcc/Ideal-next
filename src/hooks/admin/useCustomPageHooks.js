"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { submitPage } from "@/services/admin/customPageServices";
import { useRouter } from "next/navigation";

const generateSlug = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const useCustomPageHooks = () => {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const pageName = watch("page_name");

    const [slugTouched, setSlugTouched] = useState(false);
    const [metaTouched, setMetaTouched] = useState(false);

    useEffect(() => {
        // if (!slugTouched) {
            setValue("page_slug", generateSlug(pageName));
        // }

        // if (!metaTouched) {
            setValue("meta_title", pageName);
        // }
    }, [pageName, slugTouched, metaTouched, setValue]);

    const [previewSrc, setPreviewSrc] = useState(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => submitPage(formData, { token }),
        onSuccess: (result) => {
            if (result?.status === true) {
                swal("Success", result.message || "Data created", "success");
                reset();
                if (result?.data?.id) {
                    router.push("/admin/custom-page/sections/"+result?.data?.id);
                }
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
    const watchedFile = watch("image");

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
            "page_name",
            "page_slug",
            "meta_title",
            "meta_keyword",
            "meta_description",
            "js_scripts",
        ];

        fields.forEach((f) => {
            if (values[f] !== undefined && values[f] !== null && values[f] !== "") {
                formData.append(f, values[f]);
            }
        });

        if (values.image && values.image.length > 0) {
            formData.append("image", values.image[0]);
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
        setSlugTouched, setMetaTouched
    };
};
