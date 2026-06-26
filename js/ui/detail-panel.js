const DetailPanel = {
  show(interval) {
    let html = "";

    Object.entries(interval).forEach(([key, value]) => {
      html += `
     <div class="detail-row">
     
     <strong>${key}</strong>
     
     <br>
     
     ${value ?? ""}
     
     </div>
     
     <hr>
     
     `;
    });

    $("#detailPanel").html(html);
  },
};
window.DetailPanel = DetailPanel;
