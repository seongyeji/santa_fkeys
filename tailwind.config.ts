export default {
  theme: {
    extend: {
      animation: {
        phone: 'phone 1.4s infinite ease-in-out',
        'ping-slow': 'ping 2.4s cubic-bezier(0,0,0.2,1) infinite',
        'ping-slower': 'ping 3.2s cubic-bezier(0,0,0.2,1) infinite'
      },
      keyframes: {
        phone: {
          '0%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(15deg)' },
          '30%': { transform: 'rotate(-15deg)' },
          '45%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(-10deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      }
    }
  }
}
