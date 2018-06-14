import { Component, Prop, Watch, Vue, Inject } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'

import { UnitService } from '../../../services'
const unitService = new UnitService()

import './UnitList.scss'

import store from '../../../store'

@Component({
  template: require('./UnitList.html'),
  name: 'UnitList',
  components: {}
})

export class UnitList extends Vue {
  @Inject() toggleModal

  @Prop() name: string
  @Prop() unitId: number

  @State route
  @State addCardUnitId

  cardName = ''

  cards = []

  addingCard = false
  menuOpen = false

  @Watch('menuOpen')
  watchMenuOpen(newVal, oldVal) {
    if (newVal) {
      document.addEventListener('click', this.toggleMenu)
    } else {
      document.removeEventListener('click', this.toggleMenu)
    }
  }

  addCard() {
    this.cardName = ''
    store.commit('set', {
      key: 'addCardUnitId',
      value: this.unitId
    })
    this.addingCard = true
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  removeUnit() {
    store.commit('set', {
      key: 'removeUnitId',
      value: this.unitId
    })
    this.toggleModal('removeUnit')
    this.toggleMenu()
  }

  blur() {
    this.addingCard = false
  }

  submit() {
    store.dispatch('createCard', {
      courseId: parseInt(this.route.params.courseId),
      unitId: this.addCardUnitId,
      name: this.cardName,
    }).then(d => {
      this.cardName = ''
      this.addingCard = false
    })
  }

  mounted() {
    const { params } = this.$route

    unitService.get(this.unitId).then(unit => {
      const courseId = parseInt(this.route.params.courseId)
      this.cards = unit.cards
      store.commit('setUnitInCourse', { unit, courseId})
    })
  }


}
