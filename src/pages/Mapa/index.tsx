import { useEffect, useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoMercator } from "d3-geo";
import type { FeatureCollection } from "geojson";
import Container from "../../components/Container";

const PI_MUNICIPIOS_GEOJSON_URL =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-22-mun.json";

export default function Mapa() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const MAP_CENTER: [number, number] = [-42.7, -7.0];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 });
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ width: Math.max(1, Math.floor(rect.width)), height: Math.max(1, Math.floor(rect.height)) });
    });
    ro.observe(el);
    // Inicializa tamanho já na montagem
    const rect = el.getBoundingClientRect();
    setSize({ width: Math.max(1, Math.floor(rect.width)), height: Math.max(1, Math.floor(rect.height)) });
    return () => ro.disconnect();
  }, []);

  const projection = useMemo(() => {
    const { width, height } = size;
    const proj = geoMercator().center(MAP_CENTER);
    if (geoData) {
      const left = Math.max(12, Math.floor(width * 0.02));
      const right = left;
      const top = Math.max(32, Math.floor(height * 0.05));
      const bottom = Math.max(12, Math.floor(height * 0.02));
      // Ajusta para caber no container com margens e evitar corte no topo/baixo
      (proj as any).fitExtent(
        [
          [left, top],
          [Math.max(1, width - right), Math.max(1, height - bottom)],
        ],
        geoData as any
      );
      return proj;
    }
    // Fallback inicial enquanto GeoJSON carrega
    const baseScale = 2800 * (width / 800);
    return proj.scale(baseScale).translate([width / 2, height / 2]);
  }, [size, geoData]);

  useEffect(() => {
    let active = true;
    fetch(PI_MUNICIPIOS_GEOJSON_URL)
      .then((r) => r.json())
      .then((data) => {
        if (active) setGeoData(data as FeatureCollection);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Bloqueia o zoom do navegador dentro da área do mapa quando Ctrl+Scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      e.stopPropagation();
      const factor = 1.2;
      const next = e.deltaY > 0 ? zoom / factor : zoom * factor;
      const clamped = Math.max(1, Math.min(8, +next.toFixed(3)));
      setZoom(clamped);
    };
    el.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => el.removeEventListener('wheel', onWheel, true as any);
  }, [zoom]);

  return (
    <Container className="pt-24 sm:pt-28">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">Mapa do Piauí</h1>

        <div className="relative w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-2">
          <div
            ref={containerRef}
            className="w-full h-[700px] overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Controles de zoom */}
            <div className="pointer-events-auto absolute right-4 top-4 z-20 flex flex-col gap-2">
              <button
                type="button"
                aria-label="Ampliar"
                onClick={() => setZoom((z) => Math.min(8, +(z * 1.2).toFixed(2)))}
                className="h-10 w-10 rounded-md bg-white/10 text-white border border-white/15 backdrop-blur-md hover:bg-white/15 active:bg-white/20"
              >
                +
              </button>
              <button
                type="button"
                aria-label="Reduzir"
                onClick={() => setZoom((z) => Math.max(1, +(z / 1.2).toFixed(2)))}
                className="h-10 w-10 rounded-md bg-white/10 text-white border border-white/15 backdrop-blur-md hover:bg-white/15 active:bg-white/20"
              >
                −
              </button>
            </div>
            <ComposableMap
              width={size.width}
              height={size.height}
              projection={projection as unknown as any}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                center={MAP_CENTER}
                zoom={zoom}
                minZoom={1}
                maxZoom={8}
                translateExtent={[[0, 0], [size.width, size.height]]}
                // Ctrl obrigatório para arrastar; desliga o wheel aqui (tratamos no container)
                filterZoomEvent={(evt: any) => {
                  if (!evt) return false;
                  if (evt.type === 'wheel') return false;
                  return !!evt.ctrlKey;
                }}
                onMove={({ zoom }) => setZoom(zoom)}
              >
                <Geographies geography={geoData ?? PI_MUNICIPIOS_GEOJSON_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                      onMouseEnter={(e) => {
                        const name = (geo.properties as any)?.name as
                          | string
                          | undefined;
                        setTooltip(name ?? "");
                        setMousePos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseMove={(e) => {
                        setMousePos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => {
                        setTooltip(null);
                        setMousePos(null);
                      }}
                      style={{
                        default: { fill: "#3b82f6", outline: "none", stroke: "#0b1220", strokeWidth: 0.4 },
                        hover: { fill: "#60a5fa", outline: "none", cursor: "pointer" },
                        pressed: { fill: "#2563eb", outline: "none" },
                      }}
                    />
                  ))
                }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {tooltip && mousePos && (
            <div
              className="pointer-events-none fixed z-10 px-2 py-1 rounded bg-black/80 text-white text-xs shadow"
              style={{
                left: mousePos.x + 12,
                top: mousePos.y - 28,
              }}
            >
              {tooltip}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
