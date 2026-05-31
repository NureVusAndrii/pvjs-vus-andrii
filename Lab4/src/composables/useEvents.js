import { ref } from 'vue'

const events = ref([
  {
    id: 1,
    title: 'Vue Meetup',
    type: 'Мітап',
    date: '2026-04-01',
    location: 'Kharkiv IT Hub',
    shortDescription: 'Talks, networking and snacks — meet other Vue devs.',
    description:
      'Подія для розробників, які цікавляться Vue.js. У програмі короткі доповіді, обмін досвідом, нетворкінг та практичні поради щодо створення сучасних застосунків.',
    imageClass: 'gradient-purple',
  },
  {
    id: 2,
    title: 'Frontend Conf',
    type: 'Конференція',
    date: '2026-04-12',
    location: 'Online',
    shortDescription: 'Performance, accessibility, modern tooling.',
    description:
      'Конференція про сучасний frontend: оптимізація продуктивності, доступність, робота з компонентами, Vue, React, Vite та інші інструменти.',
    imageClass: 'gradient-green',
  },
  {
    id: 3,
    title: 'Hackathon',
    type: 'Хакатон',
    date: '2026-05-10',
    location: 'Innovation Space',
    shortDescription: '48 hours to build something awesome.',
    description:
      'Командне змагання для створення прототипів вебзастосунків. Учасники працюють над ідеєю, реалізують MVP та презентують результат журі.',
    imageClass: 'gradient-orange',
  },
])

export function useEvents() {
  const getEventById = (id) => {
    return events.value.find((event) => event.id === Number(id))
  }

  return {
    events,
    getEventById,
  }
}