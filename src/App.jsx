import React from 'react';
export default function PersonajesWiki() {
const SHEET_ID = '1YMldgMDfbWsLNtaA8VLHAZ3vZmKU3iRoJVkLAUHaJco';
const API_KEY = 'AIzaSyC43vKqrusaftWqmQHfpV1bOynuw1TOIWA';

  const [personajes, setPersonajes] = React.useState([]);

  React.useEffect(() => {
    async function cargarPersonajes() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Hoja1?key=${API_KEY}`
        );
const data = await response.json();
console.log(data);

        const rows = data.values || [];

        const headers = rows[0];

        const personajesConvertidos = rows.slice(1).map((row) => {
          const personaje = {};

          headers.forEach((header, index) => {
            personaje[header] = row[index] || '';
          });

          return {
            nombre: personaje.Nombre || 'Desconocido',
            rol: personaje.Rol || 'Sin rol',
            habilidad: personaje.Habilidad || 'Sin habilidad',
            descripcion: personaje.Descripcion || 'Sin descripción',
            arma: personaje.Arma || 'Sin arma',
            armaImagen: personaje.ArmaImagen || 'https://placehold.co/400x400/111827/FFFFFF?text=Arma',
  armaInfo: personaje.ArmaInfo || 'Sin estadísticas de arma',
            imagen:
              personaje.Imagen ||
              'https://placehold.co/600x800/111827/FFFFFF?text=Personaje',
              gemaImagen: personaje.GemaImagen || 'https://placehold.co/200x200/111827/00FFFF?text=Gema',
              gemaHabilidad: personaje.GemaHabilidad || 'Sin poder despertado',
            ventajas: personaje.Ventajas
              ? personaje.Ventajas.split(',')
              : [],
            limitaciones: personaje.Limitaciones
              ? personaje.Limitaciones.split(',')
              : [],
            color: 'from-cyan-500 to-blue-700'
          };
        });

        setPersonajes(personajesConvertidos);
      } catch (error) {
        console.error('Error cargando personajes:', error);
      }
    }

    cargarPersonajes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-slate-900 via-black to-slate-900 p-10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.3),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            PROJECT <span className="text-cyan-400">LANTER</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl leading-relaxed">
            Wiki interactiva de personajes inspirada en mundos virtuales estilo SAO,
            RPG futurista y anime cyber fantasy.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
              <p className="text-sm text-gray-400">Personajes</p>
              <p className="text-2xl font-bold">{personajes.length}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
              <p className="text-sm text-gray-400">Mundo</p>
              <p className="text-2xl font-bold">VR MMORPG</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
              <p className="text-sm text-gray-400">Género</p>
              <p className="text-2xl font-bold">Sci‑Fantasy</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {personajes.map((p) => (
            <div
              key={p.nombre}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div
                className={`h-2 bg-gradient-to-r ${p.color}`}
              />

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">
                      {p.nombre}
                    </h2>
                    <p className="text-cyan-300 mt-1">{p.rol}</p>
                  </div>

                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                  />
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                     <p className="text-sm uppercase tracking-widest text-cyan-400 mb-3">
                       Gema
                 </p>

                  <img
                   src={p.gemaImagen}
                    alt="Gema"
                  className="w-24 h-24 object-cover rounded-2xl border border-cyan-500/30 bg-black/40"
                 />
                 
                 <p className="mt-2 text-sm italic text-cyan-200/80 font-medium">
                   ✨ {p.gemaHabilidad}
                    </p>
                   </div>     
                  
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500">
                      Habilidad
                    </p>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {p.habilidad}
                    </h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    {p.descripcion}
                  </p>

                  <div>
  <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
    Arma Principal
  </p>
  
  <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-2xl p-3">
    {/* Contenedor de la imagen: Ajustado al ancho de la espada */}
    <div className="w-24 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
      <img
        src={p.armaImagen}
        alt={p.arma}
        className="max-w-full max-h-full object-contain"
      />
    </div>
    
    {/* Contenedor del texto: Rellena el espacio sobrante */}
    <div className="flex flex-col justify-center self-center">
      <div className="text-lg font-bold text-white leading-tight">
        {p.arma}
      </div>
      <p className="mt-2 text-sm text-gray-400 italic leading-snug">
        {p.armaInfo}
      </p>
    </div>
  </div>
</div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-emerald-400 mb-3">
                      Ventajas
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {p.ventajas.map((v) => (
                        <span
                          key={v}
                          className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-sm text-emerald-300"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-widest text-red-400 mb-3">
                      Limitaciones
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {p.limitaciones.map((l) => (
                        <span
                          key={l}
                          className="rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-sm text-red-300"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-20 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-10">
          <h2 className="text-4xl font-black">Lore del Mundo</h2>

          <p className="mt-6 text-gray-300 leading-relaxed max-w-4xl text-lg">
            Project Lanter es un MMORPG de realidad virtual donde miles de jugadores
            quedaron atrapados dentro del sistema luego de un evento misterioso.
            Algunos NPC comenzaron a presentar glitches y comportamientos anormales,
            revelando secretos ocultos sobre el verdadero propósito del juego.
          </p>

          <p className="mt-4 text-gray-400 leading-relaxed max-w-4xl">
            Los jugadores deben subir de nivel, formar alianzas y sobrevivir mientras
            descubren quién controla realmente el mundo virtual.
          </p>
        </section>
      </main>
    </div>
  );
}
