"use client";

import { useEffect, useRef, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle, Upload } from "lucide-react";

// --- Utility functions ---

function getRandomIntFromString(str: string, min = 0, max = 1000) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return (Math.abs(hash) % (max - min + 1)) + min;
}

function splitStringIntoParts(str: string, parts: number): string[] {
  const result: string[] = [];
  const partSize = Math.floor(str.length / parts);
  let remainder = str.length % parts;
  let start = 0;
  for (let i = 0; i < parts; i++) {
    const extraChar = remainder > 0 ? 1 : 0;
    result.push(str.slice(start, start + partSize + extraChar));
    start += partSize + extraChar;
    remainder--;
  }
  return result;
}

function getRandomValuesFromImage(base64String: string, divideBy: number) {
  const part = splitStringIntoParts(base64String, divideBy);
  const partNumber = part.map((s) => getRandomIntFromString(s));
  return partNumber.map((s, i) => s + i);
}

// --- Data types ---

interface MemeEntry {
  img: string;
  text: string;
}

interface ChartEntry {
  category: string;
  value: number;
  text: MemeEntry[];
}

interface ResultData {
  category: string;
  text: string;
  image: string;
}

// --- Custom tooltip ---

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartEntry }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-md border bg-background px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{data.category}</p>
      <p className="text-muted-foreground">Score: {data.value}</p>
    </div>
  );
}

// --- Main component ---

export function RadarQuiz() {
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  // Cleanup object URL on unmount or change
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Revoke previous URL
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    const url = URL.createObjectURL(file);
    setFileUrl(url);

    const reader = new FileReader();
    setLoading(true);

    reader.onloadend = () => {
      // Fake loading timer
      setTimeout(() => setLoading(false), 2000);

      const base64String = reader.result as string;
      const values = getRandomValuesFromImage(base64String, 9);

      const newChartData: ChartEntry[] = [
        {
          category: "sepuh",
          value: values[0],
          text: [
            { img: "/meme/puh.jpeg", text: "puh sepuh dewa leluhur, aku kpn yh" },
            { img: "/meme/puh2.jpeg", text: "sepuh jago gambar/ngedit/fps/ritim/semuanya, aku kpn yh" },
          ],
        },
        {
          category: "caboel",
          value: values[1],
          text: [
            { img: "/meme/bul.jpeg", text: "orang komen caboel mulu ke gambar 2d sebaiknya jangan ditemenin ntar ketularan" },
            { img: "/meme/bul2.jpeg", text: "orang gak bisa nahan hawa nafsu sama karakter kartun" },
          ],
        },
        {
          category: "kroco",
          value: values[2],
          text: [
            { img: "/meme/co.jpeg", text: "orang kroco gak dikenal siapa siapa" },
            { img: "/meme/co2.jpeg", text: "siapa yh" },
          ],
        },
        {
          category: "jomok",
          value: values[3],
          text: [
            { img: "/meme/mok.jpeg", text: "jomok banget suka kirim stiker orang hitam semoga cepet sadar" },
            { img: "/meme/mok2.jpeg", text: "mau femboy yuri orang hitam sama aja jomok is jomok" },
          ],
        },
        {
          category: "pedo",
          value: values[4],
          text: [
            { img: "/meme/pdf.jpeg", text: "bang sadar bang" },
            { img: "/meme/pdf2.jpeg", text: "halo perlindungan anak indonesia" },
          ],
        },
        {
          category: "rasis",
          value: values[5],
          text: [
            { img: "/meme/rasis.jpeg", text: "saiba momoi" },
            { img: "/meme/rasis2.jpeg", text: "orang yang suka ngomong n-word" },
          ],
        },
        {
          category: "chef",
          value: values[6],
          text: [
            { img: "/meme/chef.jpeg", text: "penggoreng handal gak pernah kelewat drama apapun" },
            { img: "/meme/chef2.jpeg", text: "setiap ada drama langsung gass goreng aja ygy gak peduli faktanya gimana" },
          ],
        },
        {
          category: "klemer",
          value: values[7],
          text: [
            { img: "/meme/klemer.jpeg", text: "yahaha waifunya musiman" },
            { img: "/meme/klemer2.jpeg", text: "bit banget apa apa di klem asw" },
          ],
        },
        {
          category: "artis",
          value: values[8],
          text: [
            { img: "/meme/tis.jpeg", text: "artis banget sejam posting langsung satu juta riek" },
            { img: "/meme/tis2.jpeg", text: "kpn yh bisa sejuta riek kayak artis ini" },
          ],
        },
      ];

      setChartData(newChartData);

      // FIX: Pick ONE random element for both text and image (was 2 separate calls)
      const sorted = [...newChartData].sort((a, b) => b.value - a.value);
      const top = sorted[0];
      const selected = top.text[Math.floor(Math.random() * top.text.length)];
      setResultData({
        category: top.category,
        text: selected.text,
        image: selected.img,
      });
    };

    if (file) reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  function reset() {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setChartData([]);
    setFileUrl("");
    setName("");
    setResultData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="space-y-8">
      {chartData.length > 0 ? (
        loading ? (
          <>
            <div className="space-y-4 grid place-content-center">
              <p className="text-lg font-bold uppercase">{name}</p>
              <div
                className="min-w-60 aspect-square bg-cover bg-center bg-no-repeat border rounded-md"
                style={{ backgroundImage: `url("${fileUrl}")` }}
              />
            </div>
            <div className="w-full h-full flex items-center justify-center gap-4">
              <LoaderCircle className="animate-spin" />
              <span>loading boongan</span>
            </div>
          </>
        ) : (
          <div className="grid justify-center w-full max-w-xs mx-auto">
            <div className="aspect-square w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} startAngle={45}>
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="category"
                    orientation="inner"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar
                    name="score"
                    dataKey="value"
                    stroke="#1c5ad5"
                    fill="#1c5ad5"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid place-content-center text-center space-y-4 py-4">
              <p>
                {name}, kamu adalah :
              </p>
              <p className="font-bold text-xl">{resultData?.category}</p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  style={{ backgroundImage: `url("${resultData?.image}")` }}
                  className="w-full aspect-square bg-cover bg-muted bg-center bg-no-repeat rounded-md"
                />
                <div
                  style={{ backgroundImage: `url("${fileUrl}")` }}
                  className="w-full aspect-square bg-cover bg-muted bg-center bg-no-repeat rounded-md"
                />
              </div>
              <p className="font-bold">&quot;{resultData?.text}&quot;</p>
            </div>
            <Button className="w-full mt-4" onClick={reset}>
              kembali
            </Button>
          </div>
        )
      ) : (
        <div className="space-y-4 w-full">
          <p className="text-2xl capitalize font-bold">
            apa role kamu di facebook
          </p>
          <div className="space-y-2">
            <label className="text-sm">nama/username kamu</label>
            <Input
              className="transition-all"
              value={name}
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <div className="space-y-2">
            <label className="text-sm">foto profil</label>
            <Button
              disabled={name === ""}
              onClick={triggerFileUpload}
              className="w-full"
              variant="secondary"
            >
              <Upload />
              Upload Foto
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              jangan pernah memasukkan data-data sensitif ke web mencurigakan kayak
              web ini
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
