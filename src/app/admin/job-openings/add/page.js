"use client";
import React from 'react';
import { useJobOpeningHooks } from '@/hooks/admin/useJobOpeninHooks';


const AddJobOpening = () => {

    const { handleSubmit, mutate, register, } = useJobOpeningHooks();

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            Manage Job Openings
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(mutate)} method='POST'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='form-group'>
                                            <label>Job Title</label>
                                            <input type='text' className='form-control' name='title' {...register('title')} />
                                        </div>
                                        <div className='form-group mt-3'>
                                            <label>Job Apply Mail</label>
                                            <input type='text' className='form-control' name='title' {...register('apply_mail')} />
                                        </div>
                                        <div className='form-group mt-3'>
                                            <label>Job Description</label>
                                            <textarea className='form-control' name='description' {...register('description')}></textarea>
                                        </div>
                                        <div className='form-group mt-3'>
                                            <button type='submit' className='btn btn-primary'>
                                                Upload Job
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddJobOpening;