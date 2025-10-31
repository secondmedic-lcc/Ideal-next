"use client";

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAdminLogin } from '@/hooks/admin/useAdminLogin';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, register, mutate, isPending } = useAdminLogin();

    const { user } = useAuthStore();


    useEffect(() => {
        const hasToken = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (user && hasToken) {
            router.push("/admin/dashboard");
        }
    }, [router, user]);

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-secondary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-5">
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold mb-2">Welcome Back</h2>
                                    <p className="text-muted">Sign in to your account</p>
                                </div>

                                <form onSubmit={handleSubmit(mutate)} method='POST' autoComplete='off'>
                                    <div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                            <input
                                                type="email"
                                                className={`form-control p-3`}
                                                id="email"
                                                name="email"
                                                {...register('email')}
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                            <div className="input-group">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className={`form-control p-3`}
                                                    id="password"
                                                    name="password"
                                                    {...register('password')}
                                                    placeholder="Enter your password"
                                                />
                                                <button
                                                    className="btn btn-outline-secondary border"
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                                        </svg>
                                                    ) : (
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <button type='submit' className="btn btn-primary btn-lg w-100 mb-3 mt-3">
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}