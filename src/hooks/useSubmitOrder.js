import {helpers, required} from "@vuelidate/validators";
import {computed, reactive} from "vue";
import {useVuelidate} from "@vuelidate/core";

export const useSubmitOrder = (props, context) => {
    const rules = {
        price: {Required: helpers.withMessage('The price is required', required)},
        amount: {Required: helpers.withMessage('The amount is required', required)}
    }

    const state = reactive({
        amount: '',
        price: ''
    })

    const v$ = useVuelidate(rules, state)

    const errorMessages = computed(() => {
        return {
            price: v$.value.price.$error ? v$.value.price.$errors[0].$message : '',
            amount: v$.value.amount.$error ? v$.value.amount.$errors[0].$message : '',
        }
    })
    const submit = () => {
        v$.value.$validate()
        if (!v$.value.$error) {
            context.emit('submit',
                {
                    amount: state.amount,
                    price: state.price
                }
            )
            state.price = ''
            state.amount = ''
            v$.value.$reset()
        }
    }

    return {v$, state, errorMessages, submit}
}