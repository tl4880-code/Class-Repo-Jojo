// 交互 1：鼠标悬停 -> 切换「森林模式」（背景变绿、故事文本模糊并浮现提示词）
const specimen = document.getElementById('specimen');

specimen.addEventListener('mouseover', () => {
    document.body.classList.add('forest-mode');
});

specimen.addEventListener('mouseout', () => {
    document.body.classList.remove('forest-mode');
});

// 交互 2：鼠标点击 -> 切换「数字皮肤」（扫描线 + 呼吸动画）并切换到第二句文本
specimen.addEventListener('click', () => {
    const story = document.getElementById('story-text');
    const isDigital = document.body.classList.contains('digital-skin');

    document.body.classList.toggle('digital-skin');

    story.textContent = isDigital
        ? '它被钉在橡木板上，玻璃眼珠凝视着远方。'
        : '当你的指尖触碰它褪色的皮毛，它的数字皮肤开始呼吸，发出了一声叹息。';

    // 可选加分项：播放叹息声（需在目录中放置 breath.mp3，缺失时静默跳过）
    const breath = new Audio('breath.mp3');
    breath.play().catch(() => {});
});
