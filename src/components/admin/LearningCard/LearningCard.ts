import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator'

import * as vue2Dropzone from 'vue2-dropzone'

import './LearningCard.scss'
import { State } from 'vuex-class'

import { UnitService } from '../../../services'
const unitService = new UnitService()

import { QuizBuilder } from '../QuizBuilder'
import { Quiz } from '../../student/Quiz'
import store from '../../../store'
import { BASE_URL } from '../../../constants'

@Component({
  template: require('./LearningCard.html'),
  name: 'LearningCard',
  components: {
    QuizBuilder,
    Quiz,
    vueDropzone: vue2Dropzone,
  }
})

export class LearningCard extends Vue {
  @Inject() toggleModal

  quizVisible: boolean = false

  @State route
  @State activeCard

  $refs: {
    video: HTMLVideoElement
  }

  @Watch('activeCard', { deep: true })
  watchActiveCard(newVal, oldVal) {
    if (newVal.media) {
      this.$refs.video.setAttribute('src', BASE_URL + '/admin/card/' + this.activeCard.id + '/media')
    }
  }

  dropzoneOptions = {
    url: BASE_URL + '/admin/upload',
    thumbnailWidth: 150,
    maxFiles: 1,
  }

  sendingEvent(file, xhr, formData) {
    formData.append('cardId', this.activeCard.id)
  }

  success(file) {
    store.commit('setActiveCardVideo', file.name)
  }

  get quiz() {
    if (this.activeCard.quiz) {
      return JSON.parse(this.activeCard.quiz)
    }
    return []
  }

  removeVideo() {
    store.commit('set', {
      key: 'removeVideoCardId',
      value: this.$route.params.cardId,
    })
    this.toggleModal('removeVideo')
  }

  mounted() {
    unitService.get(this.route.params.unitId).then(unit => {
      const cards = unit.cards.filter(card => card.id === parseInt(this.route.params.cardId))
      if (cards.length === 1) {
        const card = cards.pop()
        store.commit('setActiveCard', card)
        store.commit('setBreadcrumbs', [
          {
            label: unit.course.name,
            link: { name: 'course', params: { courseId: unit.course.id } }
          },
          {
            label: unit.name,
            link: { name: 'course', params: { courseId: unit.course.id } }
          },
          {
            label: this.activeCard.name,
            link: { name: 'card', params: { courseId: unit.course.id, unitId: unit.id, cardId: this.activeCard.id } }
          }
        ])
      } else {
        console.warn('No card', this.route.params.cardId, 'in unit', unit.name)
      }
    })
  }

  save() {
    store.dispatch('updateActiveCard', {
      id: this.activeCard.id,
      name: this.activeCard.name,
      evidence_task: this.activeCard.evidence_task,
      content: this.activeCard.content,
    })
  }
}
