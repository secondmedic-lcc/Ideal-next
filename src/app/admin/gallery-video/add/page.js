"use client";
import React from 'react';
import { useGalleryVideo } from '@/hooks/admin/useGalleryVideo';


const AddGalleryVideo = () => {

    const { handleSubmit, mutate, register, } = useGalleryVideo();

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            Manage Gallery Video
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(mutate)} method='POST'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='form-group'>
                                            <label>Video Title</label>
                                            <input type='text' className='form-control' name='title' {...register('title')} />
                                        </div>
                                        <div className='form-group mt-3'>
                                            <label>Video Link</label>
                                            <textarea className='form-control' name='link' {...register('link')}></textarea>
                                        </div>
                                        <div className='form-group mt-3'>
                                            <button type='submit' className='btn btn-primary'>
                                                Upload Video
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

export default AddGalleryVideo