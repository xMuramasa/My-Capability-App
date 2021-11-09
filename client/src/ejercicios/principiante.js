//tipo salto vertical = 1
//tipo velocidad = 2
//tipo ambos = 3

//si semana es 0 es que sirve para cualquier semana
export const principiante = [
    {
        titulo: 'Saltos Laterales cono a cono',
        obj: ' Incrementar fuerza enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Párate al lado de un cono, a unos 15 cm de distancia. 
2. Salta lateralmente y cae a la izquierda detrás del otro cono. 
3. Cuando ambos pies hayan caído repite el salto hacia la derecha
`,
        reps: '20 repeticiones',
        imagen: require('../images/ejercicios/cono1.png'),
        tipo: 1,
        semana: 0
    },

    {
        titulo: 'Saltos de frente y hacia atrás sobre un cono ',
        obj: 'Incrementar fuerza/poder enfocándose en el control neuromuscular, el uso de una buena técnica es esencial.',
        descripcion:
            `1. Párate detrás de una línea de conos y salta sobre ellos con ambas piernas hasta haber saltado todos los conos`,
        reps: '5 repeticiones',
        imagen: require('../images/ejercicios/cono2.png'),
        tipo: 1,
        semana: 0
    },

    {
        titulo: 'Salto de cajón',
        obj: 'Mejorar el salto y fuerza de cuádriceps',
        descripcion:
            `1. Saltar desde el suelo a un cajón que esté elevado. 
2. Aumentar dificultad aumentando la altura del cajón.
`,
        reps: '10 repeticiones con 4 o 5 series',
        imagen: require('../images/ejercicios/salto-cajon.png'),
        tipo: 1,
        semana: 0
    },

    {
        titulo: 'Sentadillas de Salto 1',
        obj: 'Dar fuerza a los cuádriceps',
        descripcion:
            `1. Para realizar una sentadilla con salto debemos colocar las piernas un poco más abiertas que los hombros.
2. Bajamos la cadera, los cuádriceps deben quedar paralelos al suelo, el pecho debe estar recto y debemos mirar al frente, no al suelo.
3. Una vez estamos en posición de sentadilla, realizamos un salto explosivo hacia arriba (verticalmente) para llegar a lo más alto posible.
4. El aterrizaje debe ser suave, sin bloquear las rodillas. Finalizado el salto, nos volvemos a colocar correctamente y volvemos a saltar.
`,
        reps: '3 series de 8 sentadillas de salto',
        imagen: require('../images/ejercicios/squat-jump.png'),
        tipo: 3,
        semana: 1
    },

    {
        titulo: 'Sentadillas de Salto 2',
        obj: 'Dar fuerza a los cuádriceps',
        descripcion:
            `1. Para realizar una sentadilla con salto debemos colocar las piernas un poco más abiertas que los hombros.
2. Bajamos la cadera, los cuádriceps deben quedar paralelos al suelo, el pecho debe estar recto y debemos mirar al frente, no al suelo.
3. Una vez estamos en posición de sentadilla, realizamos un salto explosivo hacia arriba (verticalmente) para llegar a lo más alto posible.
4. El aterrizaje debe ser suave, sin bloquear las rodillas. Finalizado el salto, nos volvemos a colocar correctamente y volvemos a saltar.
`,
        reps: '3 series de 10 sentadillas de salto',
        imagen: require('../images/ejercicios/squat-jump.png'),
        tipo: 3,
        semana: 2
    },

    {
        titulo: 'Sentadillas de Salto 3',
        obj: 'Dar fuerza a los cuádriceps',
        descripcion:
            `1. Para realizar una sentadilla con salto debemos colocar las piernas un poco más abiertas que los hombros.
2. Bajamos la cadera, los cuádriceps deben quedar paralelos al suelo, el pecho debe estar recto y debemos mirar al frente, no al suelo.
3. Una vez estamos en posición de sentadilla, realizamos un salto explosivo hacia arriba (verticalmente) para llegar a lo más alto posible.
4. El aterrizaje debe ser suave, sin bloquear las rodillas. Finalizado el salto, nos volvemos a colocar correctamente y volvemos a saltar.
`,
        reps: '3 series de 12 sentadillas de salto',
        imagen: require('../images/ejercicios/squat-jump.png'),
        tipo: 3,
        semana: 3
    },

    {
        titulo: 'Sentadillas de Salto 4',
        obj: 'Dar fuerza a los cuádriceps',
        descripcion:
            `1. Para realizar una sentadilla con salto debemos colocar las piernas un poco más abiertas que los hombros.
2. Bajamos la cadera, los cuádriceps deben quedar paralelos al suelo, el pecho debe estar recto y debemos mirar al frente, no al suelo.
3. Una vez estamos en posición de sentadilla, realizamos un salto explosivo hacia arriba (verticalmente) para llegar a lo más alto posible.
4. El aterrizaje debe ser suave, sin bloquear las rodillas. Finalizado el salto, nos volvemos a colocar correctamente y volvemos a saltar.
`,
        reps: '3 series de 15 sentadillas de salto',
        imagen: require('../images/ejercicios/squat-jump.png'),
        tipo: 3,
        semana: 4
    },

    {
        titulo: 'Saltos a la Pared 1',
        obj: 'Ejercicio simple que ayudará a aumentar tu salto vertical, agregar potencia y explosividad a tus piernas.',
        descripcion:
            `1. Para hacer un salto de pared, uno debe pararse a una distancia de 30 cm de la pared y estirar ambos brazos por encima de su cabeza y hacer una ligera flexión de rodillas.
2. Luego se debe saltar tan alto como uno pueda y tocar el punto más alto de la pared con la punta de tus dedos.
3. Inmediatamente después de aterrizar en las puntas de los pies, se vuelve a saltar igual que el primer salto.
4. No hay descanso entre saltos.
`,
        reps: '3 series de 12 saltos de pared',
        imagen: require('../images/ejercicios/salto-pared.png'),
        tipo: 1,
        semana: 1
    },

    {
        titulo: 'Saltos a la Pared 2',
        obj: 'Ejercicio simple que ayudará a aumentar tu salto vertical, agregar potencia y explosividad a tus piernas.',
        descripcion:
            `1. Para hacer un salto de pared, uno debe pararse a una distancia de 30 cm de la pared y estirar ambos brazos por encima de su cabeza y hacer una ligera flexión de rodillas.
2. Luego se debe saltar tan alto como uno pueda y tocar el punto más alto de la pared con la punta de tus dedos.
3. Inmediatamente después de aterrizar en las puntas de los pies, se vuelve a saltar igual que el primer salto.
4. No hay descanso entre saltos.
`,
        reps: '3 series de 15 saltos de pared',
        imagen: require('../images/ejercicios/salto-pared.png'),
        tipo: 1,
        semana: 2
    },

    {
        titulo: 'Saltos a la Pared 3',
        obj: 'Ejercicio simple que ayudará a aumentar tu salto vertical, agregar potencia y explosividad a tus piernas.',
        descripcion:
            `1. Para hacer un salto de pared, uno debe pararse a una distancia de 30 cm de la pared y estirar ambos brazos por encima de su cabeza y hacer una ligera flexión de rodillas.
2. Luego se debe saltar tan alto como uno pueda y tocar el punto más alto de la pared con la punta de tus dedos.
3. Inmediatamente después de aterrizar en las puntas de los pies, se vuelve a saltar igual que el primer salto.
4. No hay descanso entre saltos.
`,
        reps: '4 series de 15 saltos de pared',
        imagen: require('../images/ejercicios/salto-pared.png'),
        tipo: 1,
        semana: 3
    },

    {
        titulo: 'Saltos a la Pared 4',
        obj: 'Ejercicio simple que ayudará a aumentar tu salto vertical, agregar potencia y explosividad a tus piernas.',
        descripcion:
            `1. Para hacer un salto de pared, uno debe pararse a una distancia de 30 cm de la pared y estirar ambos brazos por encima de su cabeza y hacer una ligera flexión de rodillas.
2. Luego se debe saltar tan alto como uno pueda y tocar el punto más alto de la pared con la punta de tus dedos.
3. Inmediatamente después de aterrizar en las puntas de los pies, se vuelve a saltar igual que el primer salto.
4. No hay descanso entre saltos.
`,
        reps: '4 series de 18 saltos de pared',
        imagen: require('../images/ejercicios/salto-pared.png'),
        tipo: 1,
        semana: 4
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
        reps: '4 series de 4 repeticiones.',
        imagen: require('../images/ejercicios/salto-silla.png'),
        tipo: 1,
        semana: 0
    },
    {
        titulo: 'Salto dejándose caer',
        obj: 'Incrementar fuerza/poder enfocándose en el control neuromuscular, el uso de una buena técnica es esencial',
        descripcion:
            `1. Arriba de una superficie, dejarse caer con ambos pies. Tan pronto como se toque el piso, saltar con todas las fuerzas.`,
        reps: '3 series de 3 repeticiones.',
        imagen: require('../images/ejercicios/salto-caida.png'),
        tipo: 1,
        semana: 0
    }
]
