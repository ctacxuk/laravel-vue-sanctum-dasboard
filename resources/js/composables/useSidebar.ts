import {ref} from 'vue'


const isOpen = ref(false)


export default function useSidebar() {

    const toggleOpen = (value: boolean) => {
        isOpen.value = value
    }

    return {
        isOpen,
        toggleOpen
    };
}

