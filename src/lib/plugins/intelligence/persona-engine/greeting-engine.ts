import { GreetingContext, MoodState } from './types';

export class ContextGreetingEngine {
  generate(context: GreetingContext, mood: MoodState): string {
    const timeRef = {
      morning: 'Morning',
      afternoon: 'Good afternoon',
      evening: 'Hey',
      night: 'Staying up late,'
    }[context.timeOfDay];

    const achievementMsg = context.recentAchievement 
      ? ` That ${context.recentAchievement} you completed was impressive.` 
      : '';

    const moodResponse = mood.current === 'frustrated' 
      ? " Looks like some tight spots in the build — ready to tackle them together?" 
      : " Ready to jump back in?";

    return `${timeRef} Paras.${achievementMsg}${moodResponse}`;
  }
}
