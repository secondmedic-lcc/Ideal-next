"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import swal from "sweetalert";
import { getJobOpeningById, updateJobOpening } from "@/services/admin/jobOpeningService";

const EditJobOpening = () => {
    const params = useParams();
    const router = useRouter();
    const jobId = params?.job_id;

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            title: "",
            apply_mail: "",
            description: "",
            status: 1,
        },
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!jobId) return;

        let mounted = true;
        const load = async () => {
            try {
                setFetching(true);

                const res = await getJobOpeningById(jobId);
                const job = res?.data ?? res;

                if (!job || (job?.status !== undefined && job.status === 0)) {
                    if (mounted)
                        swal("Not Found", "Job Opening not found or inactive.", "error");
                    return;
                }

                if (mounted) {
                    reset({
                        title: job?.title ?? "",
                        apply_mail: job?.apply_mail ?? "",
                        description: job?.description ?? "",
                        status: typeof job?.status !== "undefined" ? Number(job.status) : 1,
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
    }, [jobId, reset]);

    const onSubmit = async (values) => {
        if (!jobId) return swal("Invalid ID", "Job ID is missing or invalid.", "error");

        try {
            setLoading(true);

            const payload = {
                title: values.title,
                apply_mail: values.apply_mail,
                description: values.description,
            };

            const res = await updateJobOpening(jobId, payload);
            const data = res?.data ?? res;

            swal("Success", res?.message || "Job Opening updated successfully.", "success").then(
                () => {
                    // ✅ Redirect after success
                    router.push("/admin/job-openings");
                }
            );
        } catch (err) {
            console.error("Update error:", err);
            swal("Update Failed", err?.message ?? "Failed to update Job Opening.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">Edit Job Opening</div>
                        <div className="card-body">
                            {fetching ? (
                                <div>Loading job details...</div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Job Title</label>
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
                                                <label>Job Apply Mail</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("apply_mail")}
                                                />
                                            </div>

                                            <div className="form-group mt-3">
                                                <label>Job Description</label>
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
                                                    {loading ? "Updating..." : "Update Job"}
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

export default EditJobOpening;
