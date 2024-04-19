import type { VNode } from 'vue';
import type { RouteLocation } from 'vue-router';

export interface TransitionContext {
  Component: VNode;
  route: RouteLocation;
}

export function getTransitionName({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def,
}: Pick<TransitionContext, 'route'> & {
  openCache: boolean;
  cacheTabs: string[];
  enableTransition: boolean;
  def: string;
}): string | undefined {
  if (!enableTransition) {
    return undefined;
  }

  const isInCache = cacheTabs.includes(route.name as string);
  const transitionName = 'fade-slide';
  let name: string | undefined = transitionName;

  if (openCache) {
    name = isInCache && route.meta.loaded ? transitionName : undefined;
  }
  return def || (route.meta.transitionName as string) || name;
}
