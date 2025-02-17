export default function(FieldMap){
  FieldMap.prototype.defaultPlot = function(row,col,plotWidth,plotLength){
    plotWidth = plotWidth || this.opts.defaultPlotWidth;
    plotLength = plotLength || this.opts.defaultPlotWidth;
    if(!this.opts.shape_memo || this.opts.shape_memo.size!=plotWidth){
      this.opts.shape_memo = Array(this.opts.gridSize*this.opts.gridSize);
      this.opts.shape_memo.size = plotWidth;
    } 
    if(!this.opts.shape_memo[(row*this.opts.gridSize)+col]){
      var o = turf.point(this.opts.defaultPos);
      var tl = turf.destination(
        turf.destination(
          o,
          plotWidth*col,
          90,
          {'units':'kilometers'}
        ),
        plotLength*row,
        180,
        {'units':'kilometers'}
      );
      var br = turf.destination(
        turf.destination(
          tl,
          plotWidth,
          90,
          {'units':'kilometers'}
        ),
        plotLength,
        180,
        {'units':'kilometers'}
      );
      var tr = turf.point([tl.geometry.coordinates[0],br.geometry.coordinates[1]]);
      var bl = turf.point([br.geometry.coordinates[0],tl.geometry.coordinates[1]]);
      this.opts.shape_memo[(row*this.opts.gridSize)+col] = turf.polygon([
        [tl, tr, br, bl, tl].map(turf.getCoord)
      ], {});
    }
    return this.opts.shape_memo[(row*this.opts.gridSize)+col];
  }
}
