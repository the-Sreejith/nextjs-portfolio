"use client"

import { Project, ProjectLink } from '@/types/Project';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, Github, Globe, Figma, FileText, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const getLinkIcon = (type: ProjectLink['type']) => {
  switch (type) {
    case 'github': return <Github size={18} />;
    case 'website': return <Globe size={18} />;
    case 'figma': return <Figma size={18} />;
    case 'behance': return <LinkIcon size={18} />; // Placeholder, replace if you have a Behance icon
    case 'report': return <FileText size={18} />;
    default: return <LinkIcon size={18} />;
  }
};

const getLinkText = (type: ProjectLink['type'], label?: string) => {
  if (label) return label;
  switch (type) {
    case 'github': return 'GitHub';
    case 'website': return 'Live Site';
    case 'figma': return 'Figma Design';
    case 'behance': return 'Behance';
    case 'report': return 'Case Study';
    default: return 'View Link';
  }
};

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close on overlay click
    >
      <motion.div
        className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Browser-like Header */}
        <div className="flex items-center rounded-t-xl justify-between p-3.5 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span onClick={onClose} className="h-3.5 w-3.5 bg-red-500 rounded-full border border-red-600/50"></span>
            <span className="h-3.5 w-3.5 bg-yellow-500 rounded-full border border-yellow-600/50"></span>
            <span className="h-3.5 w-3.5 bg-green-500 rounded-full border border-green-600/50"></span>
          </div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate mx-4 flex-grow text-center">
            {project.title}
          </p>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex-grow overflow-y-auto">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 shadow-md">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{project.title}</h2>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
              {project.badge}
            </span>
            {project.tags && project.tags.map(tag => (
              <span key={tag} className="ml-2 inline-block px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed whitespace-pre-line">
            {project.longDescription || project.description}
          </p>

          {project.links && project.links.length > 0 && (
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                Project Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {getLinkIcon(link.type)}
                    <span>{getLinkText(link.type, link.label)}</span>
                    <ExternalLink size={14} className="opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
