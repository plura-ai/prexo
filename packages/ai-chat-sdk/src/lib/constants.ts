
export const CHAT_COLORS = {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    secondary: '#F3F4F6',
    accent: '#10B981',
    background: '#FFFFFF',
    text: '#1F2937',
    textLight: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    gradients: {
      primary: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      secondary: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
    }
  } as const;
  
  export type ChatColorsType = typeof CHAT_COLORS;
  