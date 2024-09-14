import { Prisma, PrismaClient } from '@prisma/client'
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import { categories, moods, products } from './constants';
import { connect } from 'http2';

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

async function up() {
    await prisma.story.createMany({
        data: [
            {
                previewImageUrl: "https://i1.sndcdn.com/artworks-yOr624cYuBF9oezd-54mNOg-t500x500.jpg"
            },
            {
                previewImageUrl: "https://i1.sndcdn.com/artworks-ZlPyA4NElWytt5Zn-oiGlUA-t500x500.jpg"
            },
            {
                previewImageUrl: "https://i1.sndcdn.com/artworks-000624286168-dp7if1-t500x500.jpg"
            },
            {
                previewImageUrl: "https://i1.sndcdn.com/artworks-ujzLRhLyA6kUXlJX-QPWlmQ-t500x500.jpg"
            },
            {
                previewImageUrl: "https://i.toneden.io/unsafe/full-fit-in/412x732/filters:no_upscale()/https%3A%2F%2Far.toneden.io%2F1009857%2Ftracks%2F5820982%3Fcache%3D1496616046002"
            },
            {
                previewImageUrl: "https://i1.sndcdn.com/artworks-s16rr8eJ0QQV2oYf-6ob70w-t500x500.jpg"
            },
        ]
    })
    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl: "https://sun9-32.userapi.com/impg/4tDJO7Dflv444EQQvaUwmrWcamnanIOlbXoZZg/TbBZb5qYekU.jpg?size=1080x802&quality=95&sign=bf55c31a6fc6110d71be5336538eb4d4&type=album"
            },
            {
                storyId: 1,
                sourceUrl: "https://sun9-67.userapi.com/impg/Mkme022S2VmKxTanRz6sI2IOfg-fW7JqghKENw/Q4PSEDCEJ7A.jpg?size=1080x1063&quality=95&sign=1c8e402ede5c223042f2294b79d24a2c&type=album"
            },
            {
                storyId: 1,
                sourceUrl: "https://sun9-71.userapi.com/impg/DA21tKaJm8DDK1qk4JBd-Opzk4C31V8CaVlk5g/fporq63jpyE.jpg?size=1080x1066&quality=95&sign=69857200b2bbc40121e3e9a7dcf57634&type=album"
            },
            {
                storyId: 1,
                sourceUrl: "https://sun9-71.userapi.com/impg/PTcbMEAMjSEyyxzgmtRopjErsV0LgxPjkDE5wg/lL0TN8K4uac.jpg?size=1080x1080&quality=95&sign=48e28453cba22f472a616156b013573b&type=album"
            },
        ]
    })
    await prisma.user.createMany({
        data: [
            {
                fullName: "User User",
                email: "user@test.ru",
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: "Admin Admin",
                email: "admin@test.ru",
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN'
            },
            {
                fullName: "Test Testovich",
                email: "testing@test.ru",
                password: hashSync('123456789', 10),
                verified: new Date(),
                role: 'USER'
            },
        ]
    })
    await prisma.category.createMany({
        data: categories
    })
    // await prisma.product.createMany({
    //     data: products
    // })
    await prisma.mood.createMany({
        data: moods
    })
    const beat1 = await prisma.product.create({
        data: {
            newOrOld: 1,
            name: '"Moonlight" - Lil Uzi Vert x Playboi Carti x Yeat x Trippie Redd Type Beat',
            imageUrl: `https://i1.sndcdn.com/artworks-UQPHd0jyIj8yPL8v-03bqTA-t500x500.jpg`,
            categoryId: 1,
            musicUrl: `https://od.lk/s/ODZfNjUwMTM5Nzlf/rage%20kinda12345.mp3`,
            altMusicUrl: 'https://audio.jukehost.co.uk/iWCfVlRbAne62OQsxrWHeAm3nEVIRWDI',
            moods: {
                connect: [moods[3], moods[4], moods[6]]
            }
        }
    })
    const beat2 = await prisma.product.create({
        data: {
            newOrOld: 1,
            name: '"The Race" - Playboi Carti + Narcissist + F1lthy type beat',
            imageUrl: `https://sun9-24.userapi.com/impg/uCLS7JO3osnX7ua-b2dnyxTjmT3C3_Udd6UHfw/cUq7A2L0Sdo.jpg?size=1920x1918&quality=95&sign=d2070525875059ac17cfd0df3201255e&type=album`,
            categoryId: 1,
            musicUrl: `https://od.lk/s/ODZfNjUwMTQyNTVf/guitar%20playboi1234567.mp3`,
            altMusicUrl: 'https://audio.jukehost.co.uk/i9lY2Ri4uUDLGOpykqM7iK3rfiDE1qXn',
            moods: {
                connect: [moods[8], moods[9], moods[1]]
            }
        }
    })
    const beat3 = await prisma.product.create({
        data: {
            newOrOld: 1,
            name: '"Meh" - Lil Uzi Vert x Playboi Carti x Yeat x Trippie Redd Type Beat',
            imageUrl: `https://sun9-18.userapi.com/s/v1/ig2/Yvj6VXFnCPY1GhlOrkjRNE5h3gIe29q4-uv3zIL_WD0p6E45S1Dfa9s47xyzbBjfZxM4_NuLGkXJc8BJoNcRmigt.jpg?quality=95&as=32x32,48x49,72x73,108x110,160x162,240x243,360x365,480x487,540x548,640x649,704x714&from=bu&u=CmEiq5Gk7XJAofUVhZTXCNZnHMiWSPFHzAAFh3R0x_E&cs=704x714`,
            categoryId: 1,
            musicUrl: `https://od.lk/s/ODZfNjUwMTQyODJf/miss%20the%20rage%202_21234.mp3`,
            altMusicUrl: 'https://audio.jukehost.co.uk/Ldl69fV3oV9CQ8ZMpRawBGag0mLP03N0',
            moods: {
                connect: [moods[1], moods[6], moods[8]]
            }
        }
    })
    const beat4 = await prisma.product.create({
        data: {
            newOrOld: 1,
            name: '"Molly" - Lil Uzi Vert Type Beat x Playboi Carti Type Beat',
            imageUrl: `https://i1.sndcdn.com/artworks-oPlfDeszq3gDE7n1-m7EkLw-t500x500.jpg`,
            categoryId: 2,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU0ODBf/yung%20carti.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/0ClIRSNhyywbm9jEtpuowRrKPhK3LeKJ',
            moods: {
                connect: [moods[3], moods[4], moods[6]]
            }
        }
    })
    const beat5 = await prisma.product.create({
        data: {
            newOrOld: 1,
            name: '"HeavyMetal" - YEAT x PLAYBOI CARTI x OPIUM x RAGE TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-jW5HdmbOxBwgsaIj-YzRMPA-t500x500.png`,
            categoryId: 2,
            musicUrl: 'https://od.lk/s/ODZfNjQ5MjQ3NzRf/%5BFREE%5D%20YEAT%20x%20PLAYBOI%20CARTI%20x%20OPIUM%20x%20RAGE%20TYPE%20BEAT%20-%20HeavyMetal.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/Z326llP4J9BiWB9TRgSLcJAnzv1EGDdW',
            moods: {
                connect: [moods[6], moods[8], moods[9]]
            }
        }
    })
    const beat6 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"Black Beard" - $UICIDEBOY$ TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-P88y8NYs1gzbAalX-aPBSyw-t500x500.jpg`,
            categoryId: 10,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU1MTFf/%24uicideboy%24%20cursed1234.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/0yt7F9okS26o9BssEDgWBcPar9VUmsRl',
            moods: {
                connect: [moods[2], moods[5], moods[7]]
            }
        }
    })
    const beat7 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"YouCanTellMeAboutIt" - BONES X GREAF TYPE BEAT',
            imageUrl: `https://sun9-31.userapi.com/impg/UBkLR3sNr26ooxaW3FFeHzwC43CeYH1fda9urw/0tj_-D27NTM.jpg?size=735x724&quality=95&sign=a90cf3aed9062d58001b4856d718141f&type=album`,
            categoryId: 3,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU1NDVf/bones%20and%20greaf123456.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/SjdNs58CJIUN0ye8xn2xJeojI52piSMh',
            moods: {
                connect: [moods[2], moods[5], moods[7]]
            }
        }
    })
    const beat8 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"Abyss" - evil plugg + dark plugg + horror plugg type beat',
            imageUrl: `https://sun9-60.userapi.com/impg/8-La-IZotEQlaLMNjsxgtsgrTRJeKzZCQTol9w/U-hpbv8pPO8.jpg?size=564x564&quality=96&sign=2f7208430a44ec65730d76e871981181&type=album`,
            categoryId: 6,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU1NjFf/dark%20plugg.mp3',
            moods: {
                connect: [moods[5], moods[6], moods[7]]
            }
        }
    })
    const beat9 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"Road Rage" - evil plugg + dark plugg + slimesito type beat',
            imageUrl: `https://sun9-18.userapi.com/impg/VPxP-lgBgxF1Q9ss1IC2TVOg9-ACH9TXEzdQmw/nxNngq5EOCc.jpg?size=751x615&quality=96&sign=259373e24136b0a0bfe34b4324fc8674&type=album`,
            categoryId: 6,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU2MTRf/low%20budget%20sci%20fi.mp3',
            moods: {
                connect: [moods[1], moods[2], moods[9]]
            }
        }
    })
    const beat10 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"PAPARAZZI" - PHONK HOUSE x DVRST Type Beat',
            imageUrl: `https://i1.sndcdn.com/artworks-hzNIVUGmiak11NVQ-if6AuA-t500x500.jpg`,
            categoryId: 5,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU2Mjlf/midnight%20%2B12.mp3',
            moods: {
                connect: [moods[6], moods[8], moods[9]]
            }
        }
    })
    const beat11 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"THE WASTING" - SEMATARY BUTCHER HOUSE X HACKLE X WARBOY TYPE BEAT',
            imageUrl: `https://sun9-73.userapi.com/impg/revPrOOTQ9AkvHdac1XX1l1IYkJCP1khGU5APw/Mp-YROSyIgo.jpg?size=736x552&quality=95&sign=a4d84c25cdb5fe6c37041bfd5e612a69&type=album`,
            categoryId: 4,
            musicUrl: 'https://od.lk/s/ODZfNjQ5NDU2NDVf/sematary%20shoegaze.mp3',
            moods: {
                connect: [moods[0], moods[4], moods[5]]
            }
        }
    })
    const beat12 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"Chilling" - Mexikodro x diego money x Plugg type beat',
            imageUrl: `https://i1.sndcdn.com/artworks-FPDHsT0Mpjbsrft7-IDZPGQ-t500x500.jpg`,
            categoryId: 7,
            musicUrl: 'https://od.lk/s/ODZfNjUwMTM4OTBf/plug%20melodiya.mp3',
            moods: {
                connect: [moods[0], moods[3], moods[4]]
            }
        }
    })
    const beat13 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"SPINE" - PHONK HOUSE x DVRST Type Beat',
            imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRqM0OmF_2t3h1Zcy4fyuZrnQdAuT6yfdOw&s`,
            categoryId: 5,
            musicUrl: 'https://od.lk/s/ODZfNjUwMTM5MDNf/opat%20dvrst123456.mp3',
            moods: {
                connect: [moods[6], moods[8], moods[2]]
            }
        }
    })
    const beat14 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"Unknown death" -  YUNG LEAN TYPE BEAT',
            imageUrl: `https://sun9-6.userapi.com/impg/R8diTRcBym7Z9SY7gaM87hf3Alk1Mt6scsZpuw/ba0PB3h-u_Y.jpg?size=510x364&quality=96&sign=9d1425eb0bf1ff5cdc8f6614f78b3b1d&type=album`,
            categoryId: 3,
            musicUrl: 'https://od.lk/s/ODZfNjUwMTM5MTJf/yung%20lean%20bitch.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/nkbT0HvHGU3SUBwPUbPHS18C0Dx4PMGh',
            moods: {
                connect: [moods[0], moods[4], moods[6]]
            }
        }
    })
    const beat15 = await prisma.product.create({
        data: {
            newOrOld: 2,
            name: '"Castles" -  bladee x whitearmor x drain gang type beat ',
            imageUrl: `https://sun9-18.userapi.com/impf/c848416/v848416274/1b65ac/ACMvM1wHIyU.jpg?size=704x528&quality=96&sign=c82175f6f399253fd9c2d643bba8d05a&type=album`,
            categoryId: 3,
            musicUrl: 'https://od.lk/s/ODZfNjUwMTM5MjFf/%D0%97%D0%B0%D0%BC%D0%BE%D0%BA1.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/SjXkIPeZK2KNxO24w1IvYiQgyduSqVbW',
            moods: {
                connect: [moods[0], moods[4], moods[6]]
            }
        }
    })
    const beat16 = await prisma.product.create({
        data: {
            name: '"Missing" - Lil Uzi Vert x Yeat x Trippie Redd Type Beat',
            imageUrl: `https://sun9-69.userapi.com/impg/RUE3wwLUAMtGTldevoRowZoqzJwDqYmfXPbtGw/coYCzSSekJc.jpg?size=564x527&quality=95&sign=30d0fb7961f3774d95f227c363b2a368&type=album`,
            categoryId: 2,
            musicUrl: 'https://od.lk/s/ODZfNjUwMzU3MDJf/rage%20fr12342.mp3',
            altMusicUrl: 'https://audio.jukehost.co.uk/zSBLoorMy84kxpUIZ4u1hlyK6KfWbatV',
            moods: {
                connect: [moods[0], moods[4], moods[6]]
            }
        }
    })
    const beat17 = await prisma.product.create({
        data: {
            name: '"... And So It Was" - SEMATARY X HACKLE X WARBOY X WITCH HOUSE TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-y4yWh5sh2yMdFdL0-f7VCUw-t500x500.jpg`,
            categoryId: 4,
            musicUrl: 'https://od.lk/s/ODZfNjUwMzcyNTFf/real%20sematary%20for%20real%20no%20cap%20brh.mp3',
            moods: {
                connect: [moods[2], moods[6], moods[7]]
            }
        }
    })
    const beat18 = await prisma.product.create({
        data: {
            name: '"HAZE" - SEMATARY X HACKLE X WARBOY X WITCH HOUSE TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-0PiMTDq3f0bzeltU-vzCcpw-t500x500.jpg`,
            categoryId: 4,
            musicUrl: 'https://od.lk/s/ODZfNjUwMzg5NzVf/real%20neavada.mp3',
            moods: {
                connect: [moods[1], moods[8], moods[9]]
            }
        }
    })
    const beat19 = await prisma.product.create({
        data: {
            name: '"Cutter like Nevada" - SEMATARY BUTCHER HOUSE X HACKLE X WARBOY TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-6pOORiaU5jZiXZ5C-iD2OFg-t500x500.png`,
            categoryId: 4,
            musicUrl: 'https://od.lk/s/ODZfNjUwMzk1MzFf/suicide_2.mp3',
            moods: {
                connect: [moods[2], moods[6], moods[7]]
            }
        }
    })
    const beat20 = await prisma.product.create({
        data: {
            name: '"Wake up Feel nothing" - SEMATARY X HACKLE X WARBOY X WITCH HOUSE TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-f4xfyI9KFTaK9cez-3czXHw-t1080x1080.jpg`,
            categoryId: 4,
            musicUrl: 'https://od.lk/s/ODZfNjUwNDA2Njhf/semataaaary%20ghost%20mound.mp3',
            moods: {
                connect: [moods[2], moods[5], moods[7]]
            }
        }
    })
    const beat21 = await prisma.product.create({
        data: {
            name: '"REAPER" - SEMATARY X GHOST MOUNTAIN X HACKLE X WITCH HOUSE TYPE BEAT',
            imageUrl: `https://i1.sndcdn.com/artworks-ONbQIhVzPBJ3NfnW-Wl7nQg-t500x500.jpg`,
            categoryId: 4,
            musicUrl: 'https://od.lk/s/ODZfNjUwNDA2NzZf/sematary%20almost%20done.mp3',
            moods: {
                connect: [moods[1], moods[2], moods[8]]
            }
        }
    })
    const beat22 = await prisma.product.create({
        data: {
            name: '"TUNING AND DRIFT" - AGGRESSIVE PHONK TYPE BEAT',
            imageUrl: `https://i.ytimg.com/vi/m2ZBNM9KnIY/sddefault.jpg`,
            categoryId: 5,
            musicUrl: 'https://od.lk/s/ODZfNjUwNDA2ODJf/agressive%20phonk12345.mp3',
            moods: {
                connect: [moods[1], moods[2], moods[9]]
            }
        }
    })

    await prisma.productItem.createMany({
        data: [
            {
                productId: beat1.id,
                price: 16,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat1.id,
                price: 26,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat1.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },
            {
                productId: beat2.id,
                price: 17,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat2.id,
                price: 27,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat2.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },
            {
                productId: beat3.id,
                price: 16,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat3.id,
                price: 26,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat3.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },

            {
                productId: beat4.id,
                price: 16,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat4.id,
                price: 26,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat4.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },
            {
                productId: beat5.id,
                price: 16,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat5.id,
                price: 26,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat5.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },

            {
                productId: beat6.id,
                price: 17,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat6.id,
                price: 27,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat6.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },
            {
                productId: beat7.id,
                price: 16,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat7.id,
                price: 26,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat7.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat8.id,
                price: 18,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat8.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat8.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat9.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat9.id,
                price: 26,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat9.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat10.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat10.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat10.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat11.id,
                price: 16,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat11.id,
                price: 26,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat11.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat12.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat12.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat12.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat13.id,
                price: 16,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat13.id,
                price: 26,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat13.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat14.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat14.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat14.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat15.id,
                price: 16,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat15.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat15.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat16.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat16.id,
                price: 30,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat16.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat17.id,
                price: 16,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat17.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat17.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat18.id,
                price: 16,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat18.id,
                price: 26,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat18.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat19.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat19.id,
                price: 27,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat19.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
            {
                productId: beat20.id,
                price: 16,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat20.id,
                price: 27,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat20.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },
            {
                productId: beat21.id,
                price: 16,
                beatType: 1,
                newOrOld: 1
            },
            {
                productId: beat21.id,
                price: 27,
                beatType: 2,
                newOrOld: 1
            },
            {
                productId: beat21.id,
                price: 60,
                beatType: 3,
                newOrOld: 1
            },
            {
                productId: beat22.id,
                price: 17,
                beatType: 1,
                newOrOld: 2
            },
            {
                productId: beat22.id,
                price: 28,
                beatType: 2,
                newOrOld: 2
            },
            {
                productId: beat22.id,
                price: 60,
                beatType: 3,
                newOrOld: 2
            },
        ]
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 100,
                token: '111111'
            },
            {
                userId: 2,
                totalAmount: 200,
                token: '222222'
            },
        ]
    })

    await prisma.cartItem.create({
        data: 
            {
                productItemId: 1,
                cartId: 1,
                moods: {
                    connect: [moods[3], moods[4], moods[6]]
                }

            },
    })
    await prisma.cartItem.create({
        data: 
            {
                productItemId: 20,
                cartId: 1,
                moods: {
                    connect: [moods[4], moods[5], moods[8]]
                }

            },
    })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Mood" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e)
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})