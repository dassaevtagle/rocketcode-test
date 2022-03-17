import NameStage from 'components/userDataForm/stages/NameStage'
import BirthDateStage from 'components/userDataForm/stages/BirthDateStage'
import ContactStage from 'components/userDataForm/stages/ContactStage'
import LastStage from 'components/userDataForm/stages/LastStage'

const Stages = {
  1: NameStage,
  2: BirthDateStage,
  3: ContactStage,
  4: LastStage
}
Object.freeze(Stages)

export { Stages }
