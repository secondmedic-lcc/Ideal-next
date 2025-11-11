"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import swal from "sweetalert";
import { getFaqById, updateFaqs } from "@/services/admin/faqsServices";

const EditFaq = () => {
    const params = useParams();
    const router = useRouter();
    const faqId = params?.faq_id;

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!faqId) return;

        let mounted = true;
        const load = async () => {
            try {
                setFetching(true);

                const res = await getFaqById(faqId);
                const job = res?.data ?? res;

                if (!job || (job?.status !== undefined && job.status === 0)) {
                    if (mounted)
                        swal("Not Found", "FAQ not found or inactive.", "error");
                    return;
                }

                if (mounted) {
                    reset({
                        title: job?.title ?? "",
                        description: job?.description ?? "",
                    });
                }
            } catch (err) {
                console.error("Error loading job:", err);
                swal("Error", err?.message ?? "Failed to load job details.", "error");
            } finally {
                if (mounted) setFetching(false);
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, [faqId, reset]);

    const onSubmit = async (values) => {
        if (!faqId) return swal("Invalid ID", "FAQ ID is missing or invalid.", "error");

        try {
            setLoading(true);

            const payload = {
                title: values.title,
                description: values.description,
            };

            const res = await updateFaqs(faqId, payload);
            const data = res?.data ?? res;

            swal("Success", res?.message || "FAQ updated successfully.", "success").then(
                () => {
                    router.push("/admin/faqs");
                }
            );
        } catch (err) {
            console.error("Update error:", err);
            swal("Update Failed", err?.message ?? "Failed to update FAQ.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">Edit FAQ</div>
                        <div className="card-body">
                            {fetching ? (
                                <div>Loading job details...</div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>FAQ Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("title", { required: true })}
                                                />
                                                {formState.errors.title && (
                                                    <small className="text-danger">Title is required</small>
                                                )}
                                            </div>

                                            <div className="form-group mt-3">
                                                <label>FAQ Description</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={6}
                                                    {...register("description", { required: true })}
                                                />
                                                {formState.errors.description && (
                                                    <small className="text-danger">Description is required</small>
                                                )}
                                            </div>

                                            <div className="form-group mt-3 d-flex gap-2">
                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? "Updating..." : "Update FAQ"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => router.back()}
                                                    disabled={loading}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditFaq;
