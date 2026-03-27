export class TransitionAnimator {
  getAnimationStyles(isTransitioning: boolean): any {
    return {
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isTransitioning ? 0.3 : 1,
      filter: isTransitioning ? 'blur(10px)' : 'none'
    };
  }
}
