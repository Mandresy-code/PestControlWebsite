"use client";
import { useState } from "react";
import Image from "next/image";
import { Wrench } from "lucide-react";

interface AgentPhotoProps {
  src: string;
}

export default function AgentPhoto({ src }: AgentPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Placeholder />;

  return (
    <Image
      src={src}
      alt="Technicien ESEIS en intervention"
      fill
      className="object-cover"
      sizes="(max-width: 980px) 100vw, 50vw"
      onError={() => setFailed(true)}
    />
  );
}

function Placeholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-navy-200 to-navy-300 flex flex-col items-center justify-center gap-12 text-center p-32">
      <div className="w-16 h-16 rounded-full bg-navy-400/30 flex items-center justify-center">
        <Wrench size={32} strokeWidth={1} className="text-navy-500" />
      </div>
      <p className="font-mono text-mono text-navy-400 uppercase tracking-widest">
        Photo agent — à uploader
      </p>
      <p className="text-sm text-navy-400 max-w-[24ch]">
        Supabase Storage → media/team/agent.jpg
      </p>
    </div>
  );
}
