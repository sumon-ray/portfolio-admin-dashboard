'use client';

import { deleteProject, getAllProjects } from '@/services/projectService';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const SafeImage = ({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/images/banner.png',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div className="relative w-full h-48">
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded" />
      )}
      <Image
        src={error ? fallbackSrc : currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover rounded w-full h-full transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          console.warn(`Image failed to load: ${src}`);
          setError(true);
          setLoaded(true); 
        }}
        unoptimized 
      />
    </div>
  );
};

const GetAllProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getAllProjects();
      setProjects(result?.data || []);
    };

    fetchProjects();
  }, []);

  const handleUpdate = (id: string) => {
    console.log('Update project:', id);
    // Navigate to update page or open modal
    router.push(`/dashboard/project/${id}`);
  };

// delete project
const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  try {
    await deleteProject(id);
    setProjects(prev => prev.filter(project => project._id !== id));

    Swal.fire('Deleted!', 'The project has been deleted.', 'success');
  } catch (error) {
    console.error('Failed to delete project:', error);
    Swal.fire('Error', 'Could not delete the project. Please try again.', 'error');
  }
};

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div
            key={project._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-xl transition duration-300"
          >
            <SafeImage
              src={project?.image || ''}
              alt={project.title}
              width={400}
              height={200}
            />

            <h2 className="text-xl font-semibold mt-3">{project.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 text-sm mb-2">
              {project.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-sm">
              <Link
                href={project.liveLink}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Live Site
              </Link>
              <Link
                href={project.githubLink}
                target="_blank"
                className="text-gray-600 hover:underline"
              >
                GitHub
              </Link>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => handleUpdate(project._id)}>
                Update
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(project._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProjects;
