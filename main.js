import './style.css'
import Alpine from 'alpinejs'  
import { Users} from './users'

window.Alpine = Alpine
Alpine.data('users', Users)

Alpine.start()