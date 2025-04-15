// js/loadContent.js 内容

// 动态加载小说预览
function loadNovelPreviews() {
    fetch('novels/chapters.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('novelPreview');
            data.chapters.slice(0, 3).forEach(chapter => {
                container.innerHTML += `
                    <div class="preview-item mb-3">
                        <h4>${chapter.title}</h4>
                        <p>${chapter.preview}</p>
                        <a href="novels/${chapter.file}" class="btn btn-sm btn-link">继续阅读 →</a>
                        <hr>
                    </div>
                `;
            });
        });
}

// 动态加载完整章节
function loadChapterContent(chapterFile) {
    fetch(`novels/${chapterFile}`)
        .then(response => response.text())
        .then(text => {
            document.getElementById('chapterContent').innerHTML = 
                marked.parse(text); // 需要提前引入 marked.js
        });
}

// 页面加载完成后自动执行
window.addEventListener('DOMContentLoaded', () => {
    loadNovelPreviews();
});
