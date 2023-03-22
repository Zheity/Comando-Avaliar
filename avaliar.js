const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avaliar",
    description: "Deixe uma avaliação na nossa loja",
    category: "Utilidade",
    options: [
        {
          name: "vendedor",
          description: "mencione o vendedor",
          type: 6,
          required: true,
        },
        {
            name: "avaliar",
            description: "selecione de 1 estrela a 5 para a qualidade do produto ou serviço",
            type: 3,
            required: true,
            choices: [
                { name: "⭐", value: "⭐" },
                { name: "⭐⭐", value: "⭐⭐" },
                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐"},
            ]
        },
        {
            name: "texto",
            description: "descreva a sua avaliação",
            type: 3,
            required: true,
        },
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    run: async (client, interaction) => {

        const { options, guild } = interaction;
        const vendedor = options.getUser("vendedor");
        const estrelas = options.getString("avaliar");
        const texto = options.getString("texto");
    
        const ID = "ID-DO-CANAL"; // Channel onde sera enviado a avaliação
        const Cargo = "ID-DO-CARGO"; // Cargo de cliente 
    
        if (!interaction.member.roles.cache.has(Cargo)) {
          return interaction.reply({
            embeds: [
                new EmbedBuilder()
                  .setDescription(':x: Você não tem permissão para usar este comando')
                  .setColor('Red'),
              ],
              ephemeral: true,
          });
        }
    
        const embed = new EmbedBuilder()
          .setAuthor({ name: guild.name, iconURL: guild.iconURL( { dynamic: true } ) })
          .setTitle('Sistema de Feedback :star: ')
          .setDescription('Digite **/avaliar** para enviar um feedback')
          .addFields([
            {
              name: ':writing_hand: ┃ Feedback enviado por:',
              value: `> ${interaction.user} \`[${interaction.user.tag}]\``,
            },
            {
              name: ':bust_in_silhouette: ┃ Atendido por:',
              value: `> ${vendedor} \`[${vendedor.tag}]\``,
            },
            {
              name: '🏆 ┃ Estrelas:',
              value: `> ${estrelas}`,
            },
            {
              name: ':scroll: ┃ Feedback:',
              value: "```" + texto + "```",
            },
          ])
          .setColor('Aqua')
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setFooter({ text: `© ${guild.name} ┃ Desenvolvido por Nazuna#2213`, iconURL: guild.iconURL() })
          .setTimestamp();
    
        guild.channels.cache.get(ID).send({
          embeds: [embed],
        });
    
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`A sua avaliaçao foi enviada con sucesso para o canal <#${ID}>, \n\n Caso tenha alguma dúvida nos contate por ticket [Clicando Aqui](https://discord.com/channels/977017524703076402/977030471064100884) \n\n Obrigado pela preferência :)`)
              .setColor('Green'),
          ],
          ephemeral: true,
        });

    }
}