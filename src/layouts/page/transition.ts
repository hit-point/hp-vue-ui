import type { VNode } from 'vue';
import type { RouteLocation } from 'vue-router';

export interface TransitionContext {
  Component: VNode;
  route: RouteLocation;
}

export function getTransitionName({
  route,
  enableTransition,
  def,
}: Pick<TransitionContext, 'route'> & {
  enableTransition: boolean;
  def: string;
}): string | undefined {
  if (!enableTransition) {
    return undefined;
  }

  const transitionName = 'xxx';
  const name: string | undefined = transitionName;

  return def || (route.meta.transitionName as string) || name;
}
