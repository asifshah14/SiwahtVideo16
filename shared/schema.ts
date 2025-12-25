import { z } from "zod";

// TypeScript interfaces for type safety (no database tables needed)
export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  company?: string | null;
  projectDetails: string;
  status: string;
  adminNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DemoVideo {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string | null;
  isHostedVideo: boolean;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Avatar {
  id: string;
  name: string;
  description?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  gender: string;
  ethnicity?: string | null;
  ageRange?: string | null;
  voicePreview?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceSample {
  id: string;
  name: string;
  description?: string | null;
  audioUrl: string;
  language: string;
  gender: string;
  accent?: string | null;
  ageRange?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditedVideo {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl?: string | null;
  isHostedVideo: boolean;
  clientName?: string | null;
  category: string;
  tags?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PodcastSample {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  category: string;
  duration?: string | null;
  hostName?: string | null;
  guestName?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DemoConversation {
  id: string;
  prompt: string;
  response: string;
  responseVideoUrl?: string | null;
  duration: string;
  category: string;
}

export interface InteractiveAvatar {
  id: string;
  name: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl?: string | null;
  defaultPersonality: string;
  supportedLanguages: string[];
  demoConversations: DemoConversation[];
  voicePreviewUrl?: string | null;
  isPublished: boolean;
  orderIndex: number;
  metadata?: {
    voiceType?: string;
    responseTime?: string;
    specialties?: string[];
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

// Admin Media Management
export interface Media {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  fileType: 'video' | 'audio';
  originalFilename: string;
  compressedFilePath: string;
  thumbnailPath?: string | null;
  duration?: string | null;
  fileSize: string;
  isExternalLink?: boolean;
  metadata?: {
    width?: number;
    height?: number;
    codec?: string;
    bitrate?: string;
  } | null;
  audioMetadata?: {
    language?: string;
    gender?: string;
    accent?: string;
    ageRange?: string;
    episodeType?: string;
    tags?: string[];
    hostName?: string;
    guestName?: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

// Insert type definitions
export type InsertContactSubmission = {
  fullName: string;
  email: string;
  company?: string;
  projectDetails: string;
};
export type InsertDemoVideo = Omit<DemoVideo, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertAvatar = Omit<Avatar, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertVoiceSample = Omit<VoiceSample, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertEditedVideo = Omit<EditedVideo, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertPodcastSample = Omit<PodcastSample, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertInteractiveAvatar = Omit<InteractiveAvatar, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertMedia = Omit<Media, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMedia = Pick<Media, 'title' | 'category' | 'description' | 'audioMetadata'>;

// Media categories for dropdown
export const mediaCategories = [
  "AI Video Studio",
  "Avatar Studio", 
  "AI Video Editing",
  "Professional Multilingual Voice Ads",
  "AI Podcast Production"
] as const;

export type MediaCategory = typeof mediaCategories[number];

// Validation schemas
export const insertContactSubmissionSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(2, "Please enter your full name"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  company: z.string().optional(),
  projectDetails: z.string().min(1, "Message is required").min(10, "Please provide more details about your project"),
});

export const insertMediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(mediaCategories),
  description: z.string().optional(),
  fileType: z.enum(['video', 'audio']),
  originalFilename: z.string(),
  compressedFilePath: z.string(),
  thumbnailPath: z.string().optional(),
  duration: z.string().optional(),
  fileSize: z.string(),
  isExternalLink: z.boolean().optional(),
  metadata: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    codec: z.string().optional(),
    bitrate: z.string().optional(),
  }).optional(),
  audioMetadata: z.object({
    language: z.string().optional(),
    gender: z.string().optional(),
    accent: z.string().optional(),
    ageRange: z.string().optional(),
    episodeType: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hostName: z.string().optional(),
    guestName: z.string().optional(),
  }).optional(),
});

export const updateMediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(mediaCategories),
  description: z.string().optional(),
  audioMetadata: z.object({
    language: z.string().optional(),
    gender: z.string().optional(),
    accent: z.string().optional(),
    ageRange: z.string().optional(),
    episodeType: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hostName: z.string().optional(),
    guestName: z.string().optional(),
  }).optional(),
});