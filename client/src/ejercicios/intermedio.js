//tipo salto vertical = 1
//tipo velocidad = 2
//tipo ambos = 3

//si semana es 0 es que sirve para cualquier semana
export let intermedio = [
    {
        titulo: 'Salto vertical con cabeceo',
        obj: 'Incrementar la altura del salto vertical',
        descripcion:
            `1. Párate con tus manos a los costados del cuerpo.
2. Curva tus rodillas ligeramente y empuja con tus pies para saltar recto.
3. Aterriza en las bolas de los pies, manteniendo tus rodillas un poco flectadas, luego amortigua la caída con el talón para que todo el pie quite el peso del cuerpo.
`,
        reps: '20 veces por 2 sets',
        imagen: require('../images/ejercicios/salto-cabeceo.jpg'),
        tipo: 1,
        semana: 0
    },

    {
        titulo: 'Ejercicio de transferencias burpees con saltos al pecho 1',
        obj: 'Mejorar la fuerza de las piernas',
        descripcion:
            `1. Párate recto, luego realiza un burpee explosivo
2. Al momento de caer, levántate saltando e intenta llevar las rodillas al pecho  
`,
        reps: '4 series de 8 repeticiones',
        imagen: require('../images/ejercicios/burpees.png'),
        tipo: 3,
        semana: 1
    },

    {
        titulo: 'Ejercicio de transferencias burpees con saltos al pecho 2',
        obj: 'Mejorar la fuerza de las piernas',
        descripcion:
            `1. Párate recto, luego realiza un burpee explosivo
2. Al momento de caer, levántate saltando e intenta llevar las rodillas al pecho  
`,
        reps: '4 series de 8 repeticiones',
        imagen: require('../images/ejercicios/burpees.png'),
        tipo: 3,
        semana: 2
    },

    {
        titulo: 'Ejercicio de transferencias burpees con saltos al pecho 3',
        obj: '4 series de 12 repeticiones',
        descripcion:
            ` 1. Párate recto, luego realiza un burpee explosivo
2. Al momento de caer, levántate saltando e intenta llevar las rodillas al pecho  
`,
        reps: '5 series de 8 repeticiones',
        imagen: require('../images/ejercicios/burpees.png'),
        tipo: 3,
        semana: 3
    },

    {
        titulo: 'Ejercicio de transferencias burpees con saltos al pecho 4',
        obj: 'Mejorar la fuerza de las piernas',
        descripcion:
            `1. Párate recto, luego realiza un burpee explosivo
2. Al momento de caer, levántate saltando e intenta llevar las rodillas al pecho  
`,
        reps: '5 series de 12 repeticiones',
        imagen: require('../images/ejercicios/burpees.png'),
        tipo: 3,
        semana: 4
    },

    {
        titulo: 'Sentadilla búlgara',
        obj: 'Fortalecer cuádriceps, músculos isquiotibiales y pantorrillas. Realizar el ejercicio lentamente',
        descripcion:
            `1. Pararse frente a una silla (debe quedar atrás tuyo y colocar el empeine derecho sobre ella
2. Bajar lentamente la rodilla derecha cuidando la velocidad. Es importante realizar el ejercicio lentamente. 
`,
        reps: '12 repeticiones por pierna durante 4 series',
        imagen: require('../images/ejercicios/hungara.png'),
        tipo: 3,
        semana: 0
    },

    {
        titulo: 'Salto Largo de Pie',
        obj: 'Los saltos largos en pie son una forma segura y efectiva de agregar potencia y explosividad',
        descripcion:
            `1. Saltar hacia adelante con ambos pies utilizando los brazos para impulsarse.
2. Realizar un giro en el aire
3. Aterrizar manteniendo el equilibrio y con ambos pies.
`,
        reps: '12 repeticiones',
        imagen: require('../images/ejercicios/salto-pie-largo.png'),
        tipo: 3,
        semana: 0
    },

    {
        titulo: 'Entrenamiento Velocidad',
        obj: 'Desarrollar la velocidad de sprint y la resistencia',
        descripcion:
            `1. Calentamiento: 5 minutos de caminata o trote a un ritmo lento.
2. Carrera con intensidad controlada: sprint por un lapso de 40 o 45 segundos a una intensidad de 80 %.
3. Reposición física: 60 segundos de trote y 60 segundos de caminata rápida. También se admiten 120 segundos de caminata.
`,
        reps: 'La secuencia debe aplicarse durante 25 o 30 minutos',
        imagen: require('../images/ejercicios/velocidad1.png'),
        tipo: 2,
        semana: 0
    },

    {
        titulo: 'Salto de Cajón',
        obj: 'Mejorar el salto y fuerza de cuádriceps',
        descripcion:
            `1. Saltar desde el suelo a un cajón que esté elevado y repetir. 
2. Aumentar dificultad aumentando la altura del cajón.
`,
        reps: '15 repeticiones por 4 series',
        imagen: require('../images/ejercicios/salto-cajon.png'),
        tipo: 1,
        semana: 0
    },

    {
        titulo: 'Saltar la Cuerda 1',
        obj: 'Incrementar la reactividad y la coordinación enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Mejora la potencia de salto y nos ayudará a calentar todas las articulaciones y músculos que intervienen en el salto.
2. Es preferible saltar sobre una superficie suave para evitar lesiones.
`,
        reps: '4 series de 1 minuto con descansos de 30 segundos',
        imagen: require('../images/ejercicios/saltar-cuerda.png'),
        tipo: 3,
        semana: 1
    },

    {
        titulo: 'Saltar la Cuerda 2',
        obj: 'Incrementar la reactividad y la coordinación enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Mejora la potencia de salto y nos ayudará a calentar todas las articulaciones y músculos que intervienen en el salto.
2. Es preferible saltar sobre una superficie suave para evitar lesiones.
`,
        reps: '4 series de 1:30 minutos con descansos de 30 segundos',
        imagen: require('../images/ejercicios/saltar-cuerda.png'),
        tipo: 3,
        semana: 2
    },

    {
        titulo: 'Saltar la Cuerda 3',
        obj: 'Incrementar la reactividad y la coordinación enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Mejora la potencia de salto y nos ayudará a calentar todas las articulaciones y músculos que intervienen en el salto.
2. Es preferible saltar sobre una superficie suave para evitar lesiones.
`,
        reps: '4 series de 1:30 minutos con descansos de 15 segundos',
        imagen: require('../images/ejercicios/saltar-cuerda.png'),
        tipo: 3,
        semana: 3
    },

    {
        titulo: 'Saltar la Cuerda 4',
        obj: 'Incrementar la reactividad y la coordinación enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Mejora la potencia de salto y nos ayudará a calentar todas las articulaciones y músculos que intervienen en el salto.
2. Es preferible saltar sobre una superficie suave para evitar lesiones.
`,
        reps: '5 series de 2 minutos con descansos de 15 segundos',
        imagen: require('../images/ejercicios/saltar-cuerda.png'),
        tipo: 3,
        semana: 4
    },

    {
        titulo: 'Saltos sentado',
        obj: 'Incrementar fuerza/poder enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Parte sentado y luego con el impulso de los brazos salta con toda tus fuerzas.`,
        reps: '5 series de 5 repeticiones.',
        imagen: require('../images/ejercicios/salto-silla.png'),
        tipo: 1,
        semana: 0
    },

    {
        titulo: 'Salto dejándose caer',
        obj: 'Incrementar fuerza/poder enfocándose en el control neuromuscular, el uso de una buena técnica es esencial',
        descripcion:
            `1. Arriba de una superficie, dejarse caer con ambos pies. Tan pronto como se toque el piso, saltar con todas las fuerzas.`,
        reps: '3 series de 5 repeticiones.',
        imagen: require('../images/ejercicios/salto-caida.png'),
        tipo: 1,
        semana: 0
    }

]