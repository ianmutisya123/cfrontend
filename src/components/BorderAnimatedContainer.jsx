function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative w-full rounded-2xl p-[2px]">
      <div
        className="absolute inset-0 rounded-2xl animate-border pointer-events-none
        [background:conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))]"
        style={{ "--border-angle": "0deg" }}
      />

      <div className="relative z-10 rounded-2xl bg-[#111111]">
        {children}
      </div>
    </div>
  );
}

export default BorderAnimatedContainer;

/*
function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full  [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border 
    ">
      <div>
         {children}
      </div>
      
</div>
  );
}


export default BorderAnimatedContainer;*/