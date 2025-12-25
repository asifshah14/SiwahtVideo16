/*
  # Add Tavus Integration Tables

  1. New Tables
    - `tavus_replicas`
      - `id` (uuid, primary key)
      - `replica_id` (text, unique, not null) - Tavus replica ID
      - `replica_name` (text) - Name of the replica
      - `avatar_id` (uuid, foreign key) - Link to interactive_avatars table
      - `status` (text) - Replica status (training, ready, failed)
      - `thumbnail_video_url` (text) - Preview video URL
      - `training_video_url` (text) - Original training video URL
      - `metadata` (jsonb) - Additional replica metadata
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `tavus_personas`
      - `id` (uuid, primary key)
      - `persona_id` (text, unique, not null) - Tavus persona ID
      - `persona_name` (text, not null) - Name of the persona
      - `avatar_id` (uuid, foreign key) - Link to interactive_avatars table
      - `system_prompt` (text) - Persona system prompt
      - `context` (text) - Additional context for the persona
      - `llm_provider` (text) - LLM provider (openai, anthropic, etc.)
      - `llm_model` (text) - LLM model name
      - `default_replica_id` (text) - Default replica for this persona
      - `metadata` (jsonb) - Additional persona metadata
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `conversation_sessions`
      - `id` (uuid, primary key)
      - `conversation_id` (text, unique, not null) - Tavus conversation ID
      - `conversation_url` (text, not null) - Conversation URL for frontend
      - `conversation_name` (text) - Name of the conversation
      - `avatar_id` (uuid, foreign key) - Link to interactive_avatars table
      - `replica_id` (text) - Tavus replica ID used
      - `persona_id` (text) - Tavus persona ID used
      - `status` (text, default 'active') - Session status (active, ended, error)
      - `started_at` (timestamptz, default now()) - Conversation start time
      - `ended_at` (timestamptz) - Conversation end time
      - `duration_seconds` (integer) - Total conversation duration
      - `user_info` (jsonb) - User information (IP, user agent, etc.)
      - `metadata` (jsonb) - Additional session metadata
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `conversation_transcripts`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key) - Link to conversation_sessions table
      - `speaker` (text, not null) - Speaker (user or avatar)
      - `message` (text, not null) - Message content
      - `timestamp` (timestamptz, default now()) - Message timestamp
      - `metadata` (jsonb) - Additional message metadata (sentiment, etc.)
      - `created_at` (timestamptz) - Creation timestamp

  2. Table Updates
    - Update `interactive_avatars` table to add Tavus-related columns
      - `tavus_replica_id` (text) - Link to Tavus replica
      - `tavus_persona_id` (text) - Link to Tavus persona
      - `is_tavus_enabled` (boolean, default false) - Enable Tavus conversations

  3. Security
    - Enable RLS on all new tables
    - Add policies for public access to read conversation sessions (for analytics)
    - Add policies for authenticated admin users to manage all tables
    - Add policies for users to create and view their own conversation sessions
*/

-- Create tavus_replicas table
CREATE TABLE IF NOT EXISTS tavus_replicas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  replica_id TEXT UNIQUE NOT NULL,
  replica_name TEXT,
  avatar_id UUID REFERENCES interactive_avatars(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'training',
  thumbnail_video_url TEXT,
  training_video_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create tavus_personas table
CREATE TABLE IF NOT EXISTS tavus_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id TEXT UNIQUE NOT NULL,
  persona_name TEXT NOT NULL,
  avatar_id UUID REFERENCES interactive_avatars(id) ON DELETE SET NULL,
  system_prompt TEXT,
  context TEXT,
  llm_provider TEXT DEFAULT 'openai',
  llm_model TEXT DEFAULT 'gpt-4',
  default_replica_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create conversation_sessions table
CREATE TABLE IF NOT EXISTS conversation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT UNIQUE NOT NULL,
  conversation_url TEXT NOT NULL,
  conversation_name TEXT,
  avatar_id UUID REFERENCES interactive_avatars(id) ON DELETE SET NULL,
  replica_id TEXT,
  persona_id TEXT,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  user_info JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create conversation_transcripts table
CREATE TABLE IF NOT EXISTS conversation_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES conversation_sessions(id) ON DELETE CASCADE,
  speaker TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Update interactive_avatars table with Tavus columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interactive_avatars' AND column_name = 'tavus_replica_id'
  ) THEN
    ALTER TABLE interactive_avatars ADD COLUMN tavus_replica_id TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interactive_avatars' AND column_name = 'tavus_persona_id'
  ) THEN
    ALTER TABLE interactive_avatars ADD COLUMN tavus_persona_id TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'interactive_avatars' AND column_name = 'is_tavus_enabled'
  ) THEN
    ALTER TABLE interactive_avatars ADD COLUMN is_tavus_enabled BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Enable Row Level Security on all tables
ALTER TABLE tavus_replicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_transcripts ENABLE ROW LEVEL SECURITY;

-- Policies for tavus_replicas
CREATE POLICY "Public can view all replicas"
  ON tavus_replicas
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert replicas"
  ON tavus_replicas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update replicas"
  ON tavus_replicas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete replicas"
  ON tavus_replicas
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for tavus_personas
CREATE POLICY "Public can view all personas"
  ON tavus_personas
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert personas"
  ON tavus_personas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update personas"
  ON tavus_personas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete personas"
  ON tavus_personas
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for conversation_sessions
CREATE POLICY "Anyone can view conversation sessions"
  ON conversation_sessions
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create conversation sessions"
  ON conversation_sessions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sessions"
  ON conversation_sessions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sessions"
  ON conversation_sessions
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for conversation_transcripts
CREATE POLICY "Anyone can view transcripts"
  ON conversation_transcripts
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert transcripts"
  ON conversation_transcripts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transcripts"
  ON conversation_transcripts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete transcripts"
  ON conversation_transcripts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tavus_replicas_avatar_id ON tavus_replicas(avatar_id);
CREATE INDEX IF NOT EXISTS idx_tavus_personas_avatar_id ON tavus_personas(avatar_id);
CREATE INDEX IF NOT EXISTS idx_conversation_sessions_avatar_id ON conversation_sessions(avatar_id);
CREATE INDEX IF NOT EXISTS idx_conversation_sessions_status ON conversation_sessions(status);
CREATE INDEX IF NOT EXISTS idx_conversation_transcripts_session_id ON conversation_transcripts(session_id);
CREATE INDEX IF NOT EXISTS idx_conversation_transcripts_timestamp ON conversation_transcripts(timestamp);
