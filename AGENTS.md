# Instruções permanentes
- Leia README.md e todos os documentos de docs/ antes de qualquer mudança grande.
- Priorize simplicidade, acessibilidade, manutenção e linguagem para leigos.
- Evite backend, banco de dados, autenticação e dependências desnecessárias.
- Não converta o projeto em tutorial de montagem ou guia de compra.
- Mantenha textos em src/data e componentes de UI separados.
- Não use links falsos, dados fictícios ou imagens quebradas.
- Revise precisão técnica sem perder o caráter didático; registre ressalvas em docs/CONTEUDO.md.
- A referência interna em referencias/ não pode ser versionada, mencionada no site ou oferecida para download. Nunca copie essa pasta para public/ ou dist/.
- Use Tailwind v4 com @tailwindcss/vite e React Router declarativo.
- Execute npm run lint e npm run build após mudanças. Ao alterar UI, verifique teclado, navegação e responsividade; declare limites de verificação.
- Atualize docs/BACKLOG.md e docs/HANDOFF.md ao finalizar tarefas. Só conclua itens com evidências.
- Não faça push, deploy nem altere contas externas sem autorização explícita.

- Hospedagem atual: GitHub Pages, Vite base /site-hardware/ e HashRouter. Use assetUrl para recursos de public e SectionLink para rolagem na mesma página; não substitua o hash da rota com âncoras comuns.
- Valide também npm run test:production com a base real, nas larguras 320/375/390/768/1024/desktop. Preserve o workflow existente; push em main pode disparar publicação automática e exige autorização explícita.
