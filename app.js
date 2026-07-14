import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-9 w-9">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

const IconSparkles = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
  </svg>
);

const Button = ({ children, onClick, disabled, primary = false, className = "" }) => {
  const base =
    "rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40";
  const theme = primary
    ? "bg-gradient-to-r from-[#d7b27c] via-[#be8f6f] to-[#9f6579] text-[#171119] shadow-[0_15px_35px_rgba(159,101,121,.24)] hover:-translate-y-0.5"
    : "border border-white/10 bg-white/[0.03] text-[#f8f1eb] hover:border-[#d7b27c]/50 hover:text-[#d7b27c]";

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${theme} ${className}`}>
      {children}
    </button>
  );
};

const ImageUploader = ({ image, onImageUpload, title, subtitle }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const receiveFile = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) return;
      onImageUpload(file);
    },
    [onImageUpload]
  );

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#fffaf5]">{title}</h2>
        <p className="mt-1 text-sm text-[#9c909f]">{subtitle}</p>
      </div>

      <div
        className={`relative aspect-square cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
          dragging
            ? "scale-[1.01] border-[#d7b27c] bg-[#d7b27c]/5"
            : "border-white/10 bg-[#1f1728]"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          receiveFile(event.dataTransfer.files?.[0]);
        }}
      >
        {image ? (
          <>
            <img src={image} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171119] to-transparent p-4 pt-16">
              <span className="text-xs font-medium text-[#fffaf5]">Toque para trocar a imagem</span>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-[#a99dad]">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-[#d7b27c]/35 bg-[#d7b27c]/5 text-[#d7b27c]">
              <IconUpload />
            </div>
            <strong className="text-sm text-[#fffaf5]">
              {dragging ? "Solte a imagem aqui" : "Clique ou arraste uma imagem"}
            </strong>
            <span className="mt-2 text-xs text-[#807484]">JPG, PNG ou WEBP</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => receiveFile(event.target.files?.[0])}
        />
      </div>
    </div>
  );
};

const CreditSidebar = ({ credits, onAddCredits }) => (
  <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-[#15101c] p-5 lg:flex lg:flex-col">
    <div className="border-b border-white/10 pb-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[#d7b27c]">Aurora Studio</p>
      <h1 className="mt-2 text-xl font-semibold text-[#fffaf5]">AI Portrait Lab</h1>
    </div>

    <nav className="mt-7 space-y-2 text-sm">
      <button className="w-full rounded-xl bg-white/[0.05] px-4 py-3 text-left text-[#fffaf5]">Criar ensaio</button>
      <button className="w-full rounded-xl px-4 py-3 text-left text-[#8f8393] transition hover:bg-white/[0.03] hover:text-white">
        Minhas imagens
      </button>
      <button className="w-full rounded-xl px-4 py-3 text-left text-[#8f8393] transition hover:bg-white/[0.03] hover:text-white">
        Histórico
      </button>
    </nav>

    <div className="mt-auto rounded-2xl border border-[#d7b27c]/25 bg-gradient-to-br from-[#d7b27c]/10 to-[#9f6579]/10 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[#a99dad]">Saldo disponível</p>
      <div className="mt-3 text-4xl font-semibold text-[#fffaf5]">{credits}</div>
      <p className="mt-1 text-xs text-[#8f8393]">créditos</p>
      <Button primary className="mt-5 w-full" onClick={onAddCredits}>
        Adicionar créditos
      </Button>
    </div>
  </aside>
);

export default function App() {
  const [referenceImage, setReferenceImage] = useState("");
  const [personImage, setPersonImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [credits, setCredits] = useState(20);
  const [creditPanel, setCreditPanel] = useState(false);

  const handleImage = async (file, setter) => {
    const base64 = await toBase64(file);
    setter(base64);
  };

  const createPrompt = () => {
    if (!referenceImage || !personImage) return;

    setPrompt(
      "Crie uma imagem fotorealista usando a foto de referência como base para pose, roupa, cenário, enquadramento e iluminação. Preserve com alta fidelidade o rosto, a identidade e as características físicas da pessoa enviada. Mantenha proporções naturais, textura de pele realista, acabamento premium e composição profissional."
    );
  };

  return (
    <div className="min-h-screen bg-[#171119] text-[#fffaf5]">
      <div className="flex min-h-screen">
        <CreditSidebar credits={credits} onAddCredits={() => setCreditPanel(true)} />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#171119]/85 px-4 backdrop-blur-xl md:px-7">
            <div>
              <p className="text-sm font-semibold">Aurora Studio</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f8393]">Criador de ensaios com IA</p>
            </div>

            <button
              type="button"
              onClick={() => setCreditPanel(true)}
              className="rounded-xl border border-[#d7b27c]/30 bg-[#d7b27c]/5 px-3 py-2 text-xs text-[#d7b27c] lg:hidden"
            >
              {credits} créditos
            </button>
          </header>

          <div className="mx-auto max-w-6xl px-4 py-7 md:px-7 md:py-10">
            <section className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d7b27c]">Nova criação</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                Transforme duas imagens em um novo ensaio.
              </h2>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#21182a]/80 p-4 shadow-2xl shadow-black/20 md:p-5">
                <ImageUploader
                  title="Foto de referência"
                  subtitle="Pose, roupa, cenário e iluminação."
                  image={referenceImage}
                  onImageUpload={(file) => handleImage(file, setReferenceImage)}
                />
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#21182a]/80 p-4 shadow-2xl shadow-black/20 md:p-5">
                <ImageUploader
                  title="Foto da pessoa"
                  subtitle="Rosto e identidade que serão preservados."
                  image={personImage}
                  onImageUpload={(file) => handleImage(file, setPersonImage)}
                />
              </div>
            </section>

            <section className="mt-5 rounded-3xl border border-white/10 bg-[#21182a]/80 p-4 shadow-2xl shadow-black/20 md:p-6">
              <div className="flex items-center gap-2 text-[#d7b27c]">
                <IconSparkles />
                <span className="text-xs uppercase tracking-[0.16em]">Prompt editável</span>
              </div>

              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="O prompt aparecerá aqui depois da análise das imagens."
                className="mt-4 min-h-52 w-full resize-y rounded-2xl border border-white/10 bg-[#171119] p-4 text-sm leading-7 text-[#fffaf5] outline-none transition focus:border-[#d7b27c]/50"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Button onClick={createPrompt} disabled={!referenceImage || !personImage}>
                  Gerar prompt
                </Button>
                <Button
                  primary
                  disabled={!prompt || credits < 10}
                  onClick={() => setCredits((current) => Math.max(0, current - 10))}
                >
                  Gerar imagem · 10 créditos
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {creditPanel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCreditPanel(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#241a2e] p-5 shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#d7b27c]">Adicionar créditos</p>
              <h3 className="mt-2 text-2xl font-semibold">Escolha um pacote</h3>

              <div className="mt-5 space-y-3">
                {[
                  { credits: 20, price: "R$ 14,90" },
                  { credits: 50, price: "R$ 29,90" },
                  { credits: 100, price: "R$ 49,90" },
                ].map((item) => (
                  <button
                    key={item.credits}
                    type="button"
                    onClick={() => {
                      setCredits((current) => current + item.credits);
                      setCreditPanel(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-[#d7b27c]/40"
                  >
                    <span>
                      <strong className="block text-base">{item.credits} créditos</strong>
                      <small className="text-[#8f8393]">{item.credits / 10} imagens</small>
                    </span>
                    <strong className="text-[#d7b27c]">{item.price}</strong>
                  </button>
                ))}
              </div>

              <Button className="mt-4 w-full" onClick={() => setCreditPanel(false)}>
                Fechar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
