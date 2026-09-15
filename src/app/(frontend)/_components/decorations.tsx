export function RouteMap({ compact = false }: { compact?: boolean }) {
  return <div className={`route-map ${compact ? 'route-map--compact' : ''}`} aria-hidden="true">
    <span className="route-map__sun" /><span className="route-map__line" /><span className="route-map__pin route-map__pin--one" /><span className="route-map__pin route-map__pin--two" />
    <span className="route-map__label">kam dál?</span>
  </div>
}
