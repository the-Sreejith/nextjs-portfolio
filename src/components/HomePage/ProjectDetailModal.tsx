"use client"

import { Project, ProjectLink } from '@/types/Project';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, Github, Globe, Figma, FileText, Link as LinkIcon, ExternalLink, Smartphone } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const getLinkIcon = (type: ProjectLink['type']) => {
  switch (type) {
    case 'github': return <Github size={16} />;
    case 'website': return <Globe size={16} />;
    case 'figma': return <Figma size={16} />;
    case 'behance': return <LinkIcon size={16} />;
    case 'report': return <FileText size={16} />;
    case 'playstore': return <Smartphone size={16} />;
    case 'appstore': return <Smartphone size={16} />;
    default: return <LinkIcon size={16} />;
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
    case 'playstore': return 'Google Play';
    case 'appstore': return 'App Store';
    default: return 'View Link';
  }
};

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] w-full max-w-4xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1173E2] border-b-4 border-black dark:border-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span onClick={onClose} className="h-3.5 w-3.5 bg-red-500 border-2 border-black cursor-pointer hover:bg-red-400" />
              <span className="h-3.5 w-3.5 bg-yellow-400 border-2 border-black" />
              <span className="h-3.5 w-3.5 bg-green-400 border-2 border-black" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest truncate">
              {project.title}.exe
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white border-2 border-white/50 p-0.5 hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex-grow overflow-y-auto">
          {/* Project Image */}
          <div className="relative w-full aspect-video border-4 border-black dark:border-white overflow-hidden mb-6 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Title */}
          <h2 className="text-3xl uppercase tracking-wider text-foreground mb-3">{project.title}</h2>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block border-2 border-[#1173E2] text-[#1173E2] px-3 py-0.5 text-xs uppercase tracking-widest">
              {project.badge}
            </span>
            {project.tags && project.tags.map(tag => (
              <span key={tag} className="border-2 border-black dark:border-white px-3 py-0.5 text-xs uppercase tracking-wider text-foreground">
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-6 text-base">
            {project.longDescription || project.description}
          </p>

          {/* Project Links */}
          {project.links && project.links.length > 0 && (
            <div className="pt-4 border-t-4 border-black dark:border-white">
              <h4 className="text-lg uppercase tracking-widest text-foreground mb-4">
                {'>'} Project Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-zinc-800 border-4 border-black dark:border-white text-foreground text-sm uppercase tracking-wider shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] dark:hover:shadow-[5px_5px_0_0_#fff] transition-all"
                  >
                    {getLinkIcon(link.type)}
                    <span>{getLinkText(link.type, link.label)}</span>
                    <ExternalLink size={12} className="opacity-60" />
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
