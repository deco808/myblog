// 动态加载小说预览
function loadNovelPreviews() {
    // 示例：加载 fanfiction/fkmt1 的章节预览
    const category = 'fanfiction'; // 小说分类
    const workId = 'fkmt1'; // 小说 ID
    const jsonPath = `novels/${category}/${workId}/chapters.json`; // 拼接路径

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('novelPreview');
            container.innerHTML = ''; // 清空容器
            data.chapters.slice(0, 3).forEach(chapter => {
                container.innerHTML += `
                    <div class="preview-item mb-3">
                        <h4>${chapter.title}</h4>
                        <p>${chapter.preview}</p>
                        <a href="novels/${category}/${workId}/${chapter.file}" class="btn btn-sm btn-link">继续阅读 →</a>
                        <hr>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('加载章节预览失败:', error);
            document.getElementById('novelPreview').innerHTML = `
                <div class="alert alert-danger">章节预览加载失败，请刷新页面。</div>
            `;
        });
}

// 动态加载完整章节
function loadChapterContent(chapterFile) {
    const filePath = `novels/${chapterFile}`; // 拼接路径

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(text => {
            document.getElementById('chapterContent').innerHTML = marked.parse(text); // 使用 marked.js 渲染 Markdown
        })
        .catch(error => {
            console.error('加载章节内容失败:', error);
            document.getElementById('chapterContent').innerHTML = `
                <div class="alert alert-danger">章节内容加载失败，请重试。</div>
            `;
        });
}

// 页面加载完成后自动执行
window.addEventListener('DOMContentLoaded', () => {
    loadNovelPreviews(); // 加载小说预览
});